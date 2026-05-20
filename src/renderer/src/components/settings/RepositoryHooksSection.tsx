/* eslint-disable max-lines -- Why: the YAML status card, issue-command editor, policy grid, and legacy-hook section form one cohesive settings surface; splitting them across files would scatter tightly coupled state and prop drilling. */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import type {
  HookCommandSourcePolicy,
  OrcaHooks,
  Repo,
  RepoHookSettings,
  SetupRunPolicy
} from '../../../../shared/types'
import { AlertTriangle, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { SearchableSetting } from './SearchableSetting'
import { useAppStore } from '@/store'
import { readRuntimeIssueCommand, writeRuntimeIssueCommand } from '@/runtime/runtime-hooks-client'
import { DEFAULT_REPO_HOOK_SETTINGS } from './SettingsConstants'
import { normalizeHookCommandSourcePolicy } from '../../../../shared/hook-command-source-policy'

type RepositoryHooksSectionProps = {
  repo: Repo
  yamlHooks: OrcaHooks | null
  hasHooksFile: boolean
  mayNeedUpdate: boolean
  copiedTemplate: boolean
  onCopyTemplate: () => void
  onUpdateHookSettings: (settings: RepoHookSettings) => void
}

type PolicyOption<P> = { policy: P; label: string; description: string }
export type LocalCommandRow = { value: string; isPlaceholder: boolean }
const LOCAL_HOOK_NAMES = ['setup', 'archive'] as const
type LocalHookName = (typeof LOCAL_HOOK_NAMES)[number]
export type LocalCommandDraft = Record<LocalHookName, LocalCommandRow[]>
type HookSettingsPolicyDraft = Partial<
  Pick<RepoHookSettings, 'setupRunPolicy' | 'commandSourcePolicy'>
>

function getSetupRunPolicyOptions(t: TFunction): PolicyOption<SetupRunPolicy>[] {
  return [
    {
      policy: 'ask',
      label: t('settings.repoHooks.setupRunPolicy.askLabel'),
      description: t('settings.repoHooks.setupRunPolicy.askDescription')
    },
    {
      policy: 'run-by-default',
      label: t('settings.repoHooks.setupRunPolicy.runByDefaultLabel'),
      description: t('settings.repoHooks.setupRunPolicy.runByDefaultDescription')
    },
    {
      policy: 'skip-by-default',
      label: t('settings.repoHooks.setupRunPolicy.skipByDefaultLabel'),
      description: t('settings.repoHooks.setupRunPolicy.skipByDefaultDescription')
    }
  ]
}

function getCommandSourcePolicyOptions(t: TFunction): PolicyOption<HookCommandSourcePolicy>[] {
  return [
    {
      policy: 'shared-only',
      label: t('settings.repoHooks.commandSourcePolicy.sharedOnlyLabel'),
      description: t('settings.repoHooks.commandSourcePolicy.sharedOnlyDescription')
    },
    {
      policy: 'local-only',
      label: t('settings.repoHooks.commandSourcePolicy.localOnlyLabel'),
      description: t('settings.repoHooks.commandSourcePolicy.localOnlyDescription')
    },
    {
      policy: 'run-both',
      label: t('settings.repoHooks.commandSourcePolicy.runBothLabel'),
      description: t('settings.repoHooks.commandSourcePolicy.runBothDescription')
    }
  ]
}

function getLocalHookFields(t: TFunction): {
  name: LocalHookName
  label: string
  description: string
  placeholder: string
}[] {
  return [
    {
      name: 'setup',
      label: t('settings.repoHooks.localSetupCommandLabel'),
      description: t('settings.repoHooks.localSetupCommandDescription'),
      placeholder: 'cp "$ORCA_ROOT_PATH/.env" "$ORCA_WORKTREE_PATH/.env"'
    },
    {
      name: 'archive',
      label: t('settings.repoHooks.localArchiveCommandLabel'),
      description: t('settings.repoHooks.localArchiveCommandDescription'),
      placeholder: 'echo "Cleaning up $ORCA_WORKSPACE_NAME"'
    }
  ]
}

export function scriptToCommandRows(script: string | undefined): LocalCommandRow[] {
  if (!script) {
    return []
  }

  return script.split('\n').map((line) => ({
    value: line.endsWith('\r') ? line.slice(0, -1) : line,
    isPlaceholder: false
  }))
}

export function commandRowsToScript(commands: LocalCommandRow[]): string {
  return commands
    .filter((command) => !(command.isPlaceholder && command.value.length === 0))
    .map((command) => command.value)
    .join('\n')
}

function pruneLocalCommandPlaceholders(commands: LocalCommandRow[]): LocalCommandRow[] {
  return commands.filter((command) => !(command.isPlaceholder && command.value.length === 0))
}

export function localCommandDraftToScripts(draft: LocalCommandDraft): RepoHookSettings['scripts'] {
  return {
    setup: commandRowsToScript(pruneLocalCommandPlaceholders(draft.setup)),
    archive: commandRowsToScript(pruneLocalCommandPlaceholders(draft.archive))
  }
}

function getHookSettingsDraft(hookSettings: Repo['hookSettings']): RepoHookSettings {
  return {
    ...DEFAULT_REPO_HOOK_SETTINGS,
    ...hookSettings,
    scripts: {
      ...DEFAULT_REPO_HOOK_SETTINGS.scripts,
      ...hookSettings?.scripts
    }
  }
}

function getLocalCommandsDraft(hookSettings: Repo['hookSettings']): LocalCommandDraft {
  const draft = getHookSettingsDraft(hookSettings)
  return {
    setup: scriptToCommandRows(draft.scripts.setup),
    archive: scriptToCommandRows(draft.scripts.archive)
  }
}

const EXAMPLE_TEMPLATE = `scripts:
  setup: |
    pnpm worktree:setup
  archive: |
    echo "Cleaning up before archive"
issueCommand: |
  Complete {{artifact_url}}`

const YAML_STATE_STYLES: Record<string, { card: string; title: string }> = {
  loaded: {
    card: 'border-emerald-500/20 bg-emerald-500/5',
    title: 'text-emerald-700 dark:text-emerald-300'
  },
  'update-available': {
    card: 'border-amber-500/20 bg-amber-500/5',
    title: 'text-amber-700 dark:text-amber-300'
  },
  invalid: {
    card: 'border-amber-500/20 bg-amber-500/5',
    title: 'text-amber-700 dark:text-amber-300'
  },
  missing: {
    card: 'border-border/50 bg-muted/20',
    title: 'text-foreground'
  }
}

function getParseErrorFixes(t: TFunction): string[] {
  return [
    t('settings.repoHooks.parseErrorFix1'),
    t('settings.repoHooks.parseErrorFix2'),
    t('settings.repoHooks.parseErrorFix3')
  ]
}

/** Shared button grid for setup run-policy selectors. */
function PolicyOptionGrid<P extends string>({
  options,
  selected,
  onSelect,
  columns
}: {
  options: PolicyOption<P>[]
  selected: P
  onSelect: (p: P) => void
  columns: string
}): React.JSX.Element {
  return (
    <div className={`grid gap-2 ${columns}`}>
      {options.map(({ policy, label, description }) => {
        const active = selected === policy
        return (
          <button
            key={policy}
            onClick={() => onSelect(policy)}
            className={`rounded-xl border px-3 py-2.5 text-center transition-colors ${
              active
                ? 'border-foreground/15 bg-accent text-accent-foreground'
                : 'border-border/60 bg-background text-foreground hover:border-border hover:bg-muted/40'
            }`}
          >
            <span className={`block text-sm ${active ? 'font-semibold' : 'font-medium'}`}>
              {label}
            </span>
            <p
              className={`mt-1 text-[11px] leading-4 ${active ? 'text-accent-foreground/80' : 'text-muted-foreground'}`}
            >
              {description}
            </p>
          </button>
        )
      })}
    </div>
  )
}

function ExampleTemplateCard({
  copiedTemplate,
  onCopyTemplate
}: {
  copiedTemplate: boolean
  onCopyTemplate: () => void
}): React.JSX.Element {
  const { t } = useTranslation()
  return (
    <div className="space-y-2">
      <p className="text-[10px] tracking-[0.18em] text-muted-foreground">
        {t('settings.repoHooks.exampleTemplatePrefix')}{' '}
        <code className="rounded bg-muted px-1 py-0.5">orca.yaml</code>{' '}
        {t('settings.repoHooks.exampleTemplateSuffix')}
      </p>
      <div className="relative rounded-lg border border-border/50 bg-background/70">
        <Button
          type="button"
          variant={copiedTemplate ? 'secondary' : 'ghost'}
          size="sm"
          className={`absolute right-2 top-2 z-10 h-6 px-2 text-[11px] ${
            copiedTemplate ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={onCopyTemplate}
        >
          {copiedTemplate
            ? t('settings.repoHooks.copiedButton')
            : t('settings.repoHooks.copyButton')}
        </Button>
        <pre className="overflow-x-auto whitespace-pre-wrap break-words p-3 pr-16 font-mono text-[11px] leading-5 text-muted-foreground">
          {EXAMPLE_TEMPLATE}
        </pre>
      </div>
    </div>
  )
}

export function RepositoryHooksSection({
  repo,
  yamlHooks,
  hasHooksFile,
  mayNeedUpdate,
  copiedTemplate,
  onCopyTemplate,
  onUpdateHookSettings
}: RepositoryHooksSectionProps): React.JSX.Element {
  const { t } = useTranslation()
  const settings = useAppStore((s) => s.settings)
  // Why: distinguish "file has unrecognised top-level keys" from "file is
  // genuinely malformed" so users see a helpful update prompt instead of a
  // confusing parse-error when a newer Orca version adds keys to `orca.yaml`.
  const yamlState = yamlHooks
    ? 'loaded'
    : hasHooksFile
      ? mayNeedUpdate
        ? 'update-available'
        : 'invalid'
      : 'missing'
  const [hookSettingsDraft, setHookSettingsDraft] = useState(() =>
    getHookSettingsDraft(repo.hookSettings)
  )
  const hookSettingsDraftRef = useRef(hookSettingsDraft)
  hookSettingsDraftRef.current = hookSettingsDraft
  const [localCommandsDraft, setLocalCommandsDraft] = useState(() =>
    getLocalCommandsDraft(repo.hookSettings)
  )
  const localCommandsDraftRef = useRef(localCommandsDraft)
  localCommandsDraftRef.current = localCommandsDraft
  const localCommandsRepoHookSettingsRef = useRef(repo.hookSettings)
  const localCommandsDraftDirtyRef = useRef(false)
  const localCommandsPersistForRepoRef = useRef(onUpdateHookSettings)
  const localHookEntries = (['setup', 'archive'] as const)
    .map((hookName) => [hookName, hookSettingsDraft.scripts[hookName] ?? ''] as const)
    .filter(([, script]) => Boolean(script))
  // Why: the type allows `undefined` in persisted settings for backward compatibility,
  // but the UI always needs a concrete value so the policy grid has an active selection.
  const selectedSetupRunPolicy: SetupRunPolicy =
    hookSettingsDraft.setupRunPolicy ?? 'run-by-default'
  const selectedCommandSourcePolicy: HookCommandSourcePolicy = normalizeHookCommandSourcePolicy(
    hookSettingsDraft.commandSourcePolicy
  )
  const [issueCommandDraft, setIssueCommandDraft] = useState('')
  const localCommandsRepoIdRef = useRef(repo.id)
  const [hasSharedIssueCommand, setHasSharedIssueCommand] = useState(false)
  const [issueCommandSaveError, setIssueCommandSaveError] = useState<string | null>(null)
  // Why: track the latest draft across blur/unmount so repo switches still
  // persist the user's local override without racing the next repo's state load.
  const issueCommandDraftRef = useRef(issueCommandDraft)
  issueCommandDraftRef.current = issueCommandDraft
  const lastCommittedIssueCommandRef = useRef('')

  localCommandsRepoHookSettingsRef.current = repo.hookSettings

  const yamlStateTexts = useMemo(
    () => ({
      loaded: {
        heading: t('settings.repoHooks.yamlState.loadedHeading'),
        description: t('settings.repoHooks.yamlState.loadedDescription')
      },
      'update-available': {
        heading: t('settings.repoHooks.yamlState.updateAvailableHeading'),
        description: t('settings.repoHooks.yamlState.updateAvailableDescription')
      },
      invalid: {
        heading: t('settings.repoHooks.yamlState.invalidHeading'),
        description: t('settings.repoHooks.yamlState.invalidDescription')
      },
      missing: {
        heading: t('settings.repoHooks.yamlState.missingHeading'),
        description: t('settings.repoHooks.yamlState.missingDescription')
      }
    }),
    [t]
  )

  const setupRunPolicyOptions = useMemo(() => getSetupRunPolicyOptions(t), [t])
  const commandSourcePolicyOptions = useMemo(() => getCommandSourcePolicyOptions(t), [t])
  const localHookFields = useMemo(() => getLocalHookFields(t), [t])
  const parseErrorFixes = useMemo(() => getParseErrorFixes(t), [t])

  const setAndMaybePersistHookSettings = useCallback(
    (nextSettings: RepoHookSettings, shouldPersist: boolean) => {
      hookSettingsDraftRef.current = nextSettings
      setHookSettingsDraft(nextSettings)
      if (shouldPersist) {
        localCommandsDraftDirtyRef.current = false
        onUpdateHookSettings(nextSettings)
      }
    },
    [onUpdateHookSettings]
  )

  const updateLocalCommandsDraft = useCallback(
    (hookName: LocalHookName, commands: LocalCommandRow[], shouldPersist: boolean) => {
      const nextCommandsDraft = { ...localCommandsDraftRef.current, [hookName]: commands }
      localCommandsDraftRef.current = nextCommandsDraft
      setLocalCommandsDraft(nextCommandsDraft)
      if (!shouldPersist) {
        localCommandsDraftDirtyRef.current = true
      }

      const nextSettings = {
        ...hookSettingsDraftRef.current,
        scripts: {
          ...hookSettingsDraftRef.current.scripts,
          [hookName]: commandRowsToScript(commands)
        }
      }
      setAndMaybePersistHookSettings(nextSettings, shouldPersist)
    },
    [setAndMaybePersistHookSettings]
  )

  const commitLocalCommandsDraft = useCallback(
    (hookName: LocalHookName) => {
      // Why: Add Command creates an unsaved empty editor row. Existing blank script
      // lines are real rows and must round-trip, so only placeholder blanks are pruned.
      const next = pruneLocalCommandPlaceholders(localCommandsDraftRef.current[hookName])
      updateLocalCommandsDraft(hookName, next, true)
    },
    [updateLocalCommandsDraft]
  )

  const flushDirtyLocalCommandsDraft = useCallback(
    (persistHookSettings: (settings: RepoHookSettings) => void) => {
      if (!localCommandsDraftDirtyRef.current) {
        return
      }

      const nextSettings = {
        ...hookSettingsDraftRef.current,
        scripts: {
          ...hookSettingsDraftRef.current.scripts,
          ...localCommandDraftToScripts(localCommandsDraftRef.current)
        }
      }
      hookSettingsDraftRef.current = nextSettings
      localCommandsDraftDirtyRef.current = false
      persistHookSettings(nextSettings)
    },
    []
  )

  const updateHookSettingsPolicyDraft = useCallback(
    (updates: HookSettingsPolicyDraft) => {
      const nextSettings = {
        ...hookSettingsDraftRef.current,
        ...updates
      }
      setAndMaybePersistHookSettings(nextSettings, true)
    },
    [setAndMaybePersistHookSettings]
  )

  const handleClearLocalCommands = useCallback(() => {
    const nextCommandsDraft = { setup: [], archive: [] }
    localCommandsDraftRef.current = nextCommandsDraft
    setLocalCommandsDraft(nextCommandsDraft)
    const nextSettings = {
      ...hookSettingsDraftRef.current,
      scripts: {
        ...hookSettingsDraftRef.current.scripts,
        setup: '',
        archive: ''
      }
    }
    setAndMaybePersistHookSettings(nextSettings, true)
  }, [setAndMaybePersistHookSettings])

  useEffect(() => {
    if (localCommandsRepoIdRef.current === repo.id) {
      localCommandsPersistForRepoRef.current = onUpdateHookSettings
      return
    }
    // Why: repo switches reset the local editor state before inputs can blur,
    // so flush dirty row drafts through the previous repo's captured updater.
    flushDirtyLocalCommandsDraft(localCommandsPersistForRepoRef.current)
    localCommandsRepoIdRef.current = repo.id
    const nextSettingsDraft = getHookSettingsDraft(localCommandsRepoHookSettingsRef.current)
    const nextCommandsDraft = getLocalCommandsDraft(localCommandsRepoHookSettingsRef.current)
    hookSettingsDraftRef.current = nextSettingsDraft
    localCommandsDraftRef.current = nextCommandsDraft
    localCommandsDraftDirtyRef.current = false
    localCommandsPersistForRepoRef.current = onUpdateHookSettings
    setHookSettingsDraft(nextSettingsDraft)
    setLocalCommandsDraft(nextCommandsDraft)
  }, [flushDirtyLocalCommandsDraft, onUpdateHookSettings, repo.id])

  useEffect(() => {
    return () => {
      flushDirtyLocalCommandsDraft(localCommandsPersistForRepoRef.current)
    }
  }, [flushDirtyLocalCommandsDraft])

  // Keep the local override editor in sync with the selected repo and flush unsaved edits on exit.
  useEffect(() => {
    let cancelled = false
    const repoId = repo.id

    setIssueCommandDraft('')
    setHasSharedIssueCommand(false)
    setIssueCommandSaveError(null)

    // Why: settings only edit the local override, but we still need to know
    // whether `orca.yaml` defines a shared default so the helper copy can
    // explain what happens when the override is blank.
    void readRuntimeIssueCommand(settings, repoId)
      .then((result) => {
        if (cancelled) {
          return
        }
        const localContent = result.localContent ?? ''
        setIssueCommandDraft(localContent)
        setHasSharedIssueCommand(Boolean(result.sharedContent))
        lastCommittedIssueCommandRef.current = localContent
      })
      .catch(() => {
        if (!cancelled) {
          setIssueCommandDraft('')
          setHasSharedIssueCommand(false)
          lastCommittedIssueCommandRef.current = ''
        }
      })

    return () => {
      cancelled = true
      const draft = issueCommandDraftRef.current.trim()
      if (draft !== lastCommittedIssueCommandRef.current) {
        void writeRuntimeIssueCommand(settings, repoId, draft).catch((err) => {
          console.error('[RepositoryHooksSection] Failed to save issue command on unmount:', err)
        })
      }
    }
  }, [repo.id, settings])

  const commitIssueCommand = useCallback(async (): Promise<void> => {
    const trimmed = issueCommandDraft.trim()
    setIssueCommandDraft(trimmed)
    try {
      await writeRuntimeIssueCommand(settings, repo.id, trimmed)
      lastCommittedIssueCommandRef.current = trimmed
      setIssueCommandSaveError(null)
    } catch (err) {
      console.error('[RepositoryHooksSection] Failed to write issue command:', err)
      const message =
        err instanceof Error ? err.message : t('settings.repoHooks.toast.saveIssueCommandFailed')
      setIssueCommandSaveError(message)
      toast.error(message)
    }
  }, [issueCommandDraft, repo.id, settings, t])

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">{t('settings.repoHooks.title')}</h2>
        <p className="text-xs text-muted-foreground">{t('settings.repoHooks.description')}</p>
      </div>

      <SearchableSetting
        title={t('settings.repoHooks.yamlHooksTitle')}
        description={t('settings.repoHooks.yamlHooksDescription')}
        keywords={['hooks', 'setup', 'archive', 'yaml']}
      >
        <div className={`space-y-3 rounded-xl border p-4 ${YAML_STATE_STYLES[yamlState].card}`}>
          <div className="space-y-1">
            <p className={`text-sm font-medium ${YAML_STATE_STYLES[yamlState].title}`}>
              {yamlStateTexts[yamlState].heading}
            </p>
            <p className="text-xs text-muted-foreground">{yamlStateTexts[yamlState].description}</p>
          </div>

          {yamlState === 'loaded' ? (
            <div className="space-y-2">
              <div className="rounded-lg border border-border/50 bg-background/70">
                <pre className="overflow-x-auto whitespace-pre-wrap break-words p-3 font-mono text-[11px] leading-5 text-foreground">
                  {renderYamlScriptPreview(yamlHooks)}
                </pre>
              </div>
              <p className="text-xs text-muted-foreground">
                {t('settings.repoHooks.editYamlHint')}
              </p>
            </div>
          ) : yamlState === 'update-available' ? (
            <ExampleTemplateCard copiedTemplate={copiedTemplate} onCopyTemplate={onCopyTemplate} />
          ) : yamlState === 'invalid' ? (
            <div className="space-y-5">
              <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-background/60 p-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/12 text-amber-600 dark:text-amber-300">
                  <AlertTriangle className="size-5" />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-amber-900 dark:text-amber-100">
                      {yamlStateTexts.invalid.heading}
                    </p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {/* Why: once a repo has an `orca.yaml`, the failure mode is usually bad shape
                      rather than a missing concept. Showing a repair-oriented explanation and
                      template here lets maintainers fix the committed file without needing the doc. */}
                      {t('settings.repoHooks.invalidCardDescription')}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {t('settings.repoHooks.recommendedFixes')}
                    </p>
                    <ol className="space-y-2.5 text-sm text-muted-foreground">
                      {parseErrorFixes.map((fix, index) => (
                        <li key={fix} className="flex items-start gap-3">
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-foreground">
                            {index + 1}
                          </span>
                          <span className="leading-6">{fix}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              <ExampleTemplateCard
                copiedTemplate={copiedTemplate}
                onCopyTemplate={onCopyTemplate}
              />
            </div>
          ) : (
            <ExampleTemplateCard copiedTemplate={copiedTemplate} onCopyTemplate={onCopyTemplate} />
          )}
        </div>
      </SearchableSetting>

      <SearchableSetting
        title={t('settings.repoHooks.localCommandsTitle')}
        description={t('settings.repoHooks.localCommandsDescription')}
        keywords={['local', 'personal', 'setup', 'archive']}
      >
        <div className="space-y-4 rounded-2xl border border-border/50 bg-background/80 p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h5 className="text-sm font-semibold">
                {t('settings.repoHooks.localCommandsHeaderTitle')}
              </h5>
              <p className="text-xs text-muted-foreground">
                {t('settings.repoHooks.localCommandsHeaderDescription')}
              </p>
            </div>
            {localHookEntries.length > 0 ? (
              <Button type="button" variant="outline" size="sm" onClick={handleClearLocalCommands}>
                {t('settings.repoHooks.clearLocal')}
              </Button>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {['$ORCA_ROOT_PATH', '$ORCA_WORKTREE_PATH', '$ORCA_WORKSPACE_NAME'].map((name) => (
              <code
                key={name}
                className="rounded-md border border-border/50 bg-muted/35 px-2 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {name}
              </code>
            ))}
          </div>

          <div className="grid gap-3">
            {localHookFields.map((field) => {
              const commands = localCommandsDraft[field.name]
              return (
                <div key={field.name} className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground">{field.label}</label>
                      <p className="text-[11px] text-muted-foreground">{field.description}</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateLocalCommandsDraft(
                          field.name,
                          [...commands, { value: '', isPlaceholder: true }],
                          false
                        )
                      }
                    >
                      <Plus />
                      {t('settings.repoHooks.addCommand')}
                    </Button>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-border/50">
                    {commands.length === 0 ? (
                      <div className="px-3 py-4 text-sm text-muted-foreground">
                        {t('settings.repoHooks.noLocalCommands', { hookName: field.label })}
                      </div>
                    ) : (
                      <div className="divide-y divide-border/50">
                        {commands.map((command, index) => (
                          <div
                            key={`${field.name}-${index}`}
                            className="grid grid-cols-[auto_1fr_auto] items-center gap-2 px-3 py-2"
                          >
                            <span className="w-5 text-right font-mono text-[11px] text-muted-foreground">
                              {index + 1}
                            </span>
                            <Input
                              value={command.value}
                              onChange={(event) => {
                                const next = [...commands]
                                next[index] = {
                                  value: event.target.value,
                                  isPlaceholder: false
                                }
                                updateLocalCommandsDraft(field.name, next, false)
                              }}
                              onBlur={() => commitLocalCommandsDraft(field.name)}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                  event.preventDefault()
                                  updateLocalCommandsDraft(
                                    field.name,
                                    [
                                      ...commands.slice(0, index + 1),
                                      { value: '', isPlaceholder: true },
                                      ...commands.slice(index + 1)
                                    ],
                                    false
                                  )
                                }
                              }}
                              placeholder={
                                index === 0
                                  ? field.placeholder
                                  : t('settings.repoHooks.commandPlaceholder')
                              }
                              className="h-8 font-mono text-xs"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              aria-label={t('settings.repoHooks.removeCommandAriaLabel', {
                                label: field.label,
                                index: index + 1
                              })}
                              onClick={() =>
                                updateLocalCommandsDraft(
                                  field.name,
                                  commands.filter((_, commandIndex) => commandIndex !== index),
                                  true
                                )
                              }
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </SearchableSetting>

      <SearchableSetting
        title={t('settings.repoHooks.commandSourceTitle')}
        description={t('settings.repoHooks.commandSourceDescription')}
        keywords={['command source', 'local', 'shared', 'orca.yaml', 'both', 'authoritative']}
      >
        <div className="space-y-3 rounded-2xl border border-border/50 bg-background/80 p-4 shadow-sm">
          <div className="space-y-1">
            <h5 className="text-sm font-semibold">
              {t('settings.repoHooks.commandSourceHeaderTitle')}
            </h5>
            <p className="text-xs text-muted-foreground">
              {t('settings.repoHooks.commandSourceHeaderDescription')}
            </p>
          </div>

          <PolicyOptionGrid
            options={commandSourcePolicyOptions}
            selected={selectedCommandSourcePolicy}
            onSelect={(policy) => updateHookSettingsPolicyDraft({ commandSourcePolicy: policy })}
            columns="md:grid-cols-3"
          />
        </div>
      </SearchableSetting>

      <SearchableSetting
        title={t('settings.repoHooks.whenToRunSetupTitle')}
        description={t('settings.repoHooks.whenToRunSetupDescription')}
        keywords={['setup run policy', 'ask', 'run by default', 'skip by default']}
      >
        <div className="space-y-3 rounded-2xl border border-border/50 bg-background/80 p-4 shadow-sm">
          <div className="space-y-1">
            <h5 className="text-sm font-semibold">
              {t('settings.repoHooks.whenToRunSetupHeaderTitle')}
            </h5>
            <p className="text-xs text-muted-foreground">
              {t('settings.repoHooks.whenToRunSetupHeaderDescription')}
            </p>
          </div>

          <PolicyOptionGrid
            options={setupRunPolicyOptions}
            selected={selectedSetupRunPolicy}
            onSelect={(policy) => updateHookSettingsPolicyDraft({ setupRunPolicy: policy })}
            columns="md:grid-cols-3"
          />
        </div>
      </SearchableSetting>

      <SearchableSetting
        title={t('settings.repoHooks.customIssueCommandTitle')}
        description={t('settings.repoHooks.customIssueCommandDescription')}
        keywords={['github issue command', 'issue command', 'workflow', 'agent', 'github']}
      >
        <div className="space-y-3 rounded-2xl border border-border/50 bg-background/80 p-4 shadow-sm">
          <div className="space-y-1">
            <h5 className="text-sm font-semibold">
              {t('settings.repoHooks.customIssueCommandHeaderTitle')}
            </h5>
          </div>
          <div className="space-y-2">
            <textarea
              value={issueCommandDraft}
              onChange={(e) => setIssueCommandDraft(e.target.value)}
              onBlur={commitIssueCommand}
              placeholder={t('settings.repoHooks.issueCommandPlaceholder')}
              rows={5}
              className="w-full min-w-0 resize-y rounded-md border border-input bg-transparent px-3 py-2 font-mono text-xs shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
            <p className="text-xs text-muted-foreground">
              {t('settings.repoHooks.issueCommandHelper1Prefix')}{' '}
              <code className="rounded bg-muted px-1 py-0.5">{'{{artifact_url}}'}</code>{' '}
              {t('settings.repoHooks.issueCommandHelper1Middle')}{' '}
              <code className="rounded bg-muted px-1 py-0.5">Complete {'{{artifact_url}}'}</code>{' '}
              {t('settings.repoHooks.issueCommandHelper1Suffix')}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('settings.repoHooks.issueCommandHelper2Prefix')}{' '}
              <code className="rounded bg-muted px-1 py-0.5">orca.yaml</code>
              {hasSharedIssueCommand
                ? t('settings.repoHooks.issueCommandHelper2SuffixShared')
                : t('settings.repoHooks.issueCommandHelper2SuffixMissing')}
            </p>
            {issueCommandSaveError ? (
              <p className="text-xs text-destructive">{issueCommandSaveError}</p>
            ) : null}
          </div>
        </div>
      </SearchableSetting>
    </section>
  )
}

function renderYamlScriptPreview(hooks: OrcaHooks | null): string {
  const fmt = (key: string, cmd?: string): string =>
    cmd ? `\n  ${key}: |\n${cmd.replace(/^/gm, '    ')}` : ''
  const issueCommand = hooks?.issueCommand
    ? `\nissueCommand: |\n${hooks.issueCommand.replace(/^/gm, '  ')}`
    : ''
  return `scripts:${fmt('setup', hooks?.scripts.setup)}${fmt('archive', hooks?.scripts.archive)}${issueCommand}`
}
