/* eslint-disable max-lines -- Why: GeneralPane is the single owner of all general settings UI;
   splitting individual settings into separate files would scatter related controls without a
   meaningful abstraction boundary. */
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { GlobalSettings, OpenInApplication } from '../../../../shared/types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Download, FolderOpen, Loader2, RefreshCw, Star, Timer } from 'lucide-react'
import { useAppStore } from '../../store'
import { CliSection } from './CliSection'
import { toast } from 'sonner'
import {
  DEFAULT_EDITOR_AUTO_SAVE_DELAY_MS,
  MAX_EDITOR_AUTO_SAVE_DELAY_MS,
  MIN_EDITOR_AUTO_SAVE_DELAY_MS
} from '../../../../shared/constants'
import { OPEN_IN_APPLICATIONS_MAX } from '../../../../shared/open-in-applications'
import { clampNumber } from '@/lib/terminal-theme'
import {
  getGeneralCacheTimerSearchEntries,
  getGeneralCliSearchEntries,
  getGeneralEditorSearchEntries,
  getGeneralPaneSearchEntries,
  getGeneralSupportSearchEntries,
  getGeneralUpdateSearchEntries,
  getGeneralWorkspaceSearchEntries
} from './general-search'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SearchableSetting } from './SearchableSetting'
import { matchesSettingsSearch } from './settings-search'
import {
  ORCA_LANGUAGES,
  ORCA_LANGUAGE_LABELS,
  resolveLanguagePreference
} from '../../../../shared/i18n/languages'

function createOpenInApplication(): OpenInApplication {
  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `open-in-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,
    label: '',
    command: ''
  }
}

function createPresetOpenInApplication(label: string, command: string): OpenInApplication {
  return {
    ...createOpenInApplication(),
    label,
    command
  }
}

export function shouldCommitOpenInApplicationsDraft(applications: OpenInApplication[]): boolean {
  return applications.every((application) => {
    return application.label.trim() !== '' && application.command.trim() !== ''
  })
}

export { getGeneralPaneSearchEntries }

type GeneralPaneProps = {
  settings: GlobalSettings
  updateSettings: (updates: Partial<GlobalSettings>) => void
}

export function GeneralPane({ settings, updateSettings }: GeneralPaneProps): React.JSX.Element {
  const searchQuery = useAppStore((s) => s.settingsSearchQuery)
  const updateStatus = useAppStore((s) => s.updateStatus)
  // Why: the 'error' variant of UpdateStatus does not carry a `version` field.
  // The main process emits `{ state: 'error' }` for both check failures (no
  // version known yet) and download/install failures (version was known from
  // the preceding 'available'/'downloading'/'downloaded' state). Cache the
  // last-known version so the error copy below can distinguish the two cases
  // without adding IPC. Mirrors `versionRef` in UpdateCard.tsx.
  const updateVersionRef = useRef<string | null>(null)
  if (
    (updateStatus.state === 'available' ||
      updateStatus.state === 'downloading' ||
      updateStatus.state === 'downloaded') &&
    updateStatus.version
  ) {
    updateVersionRef.current = updateStatus.version
  } else if (
    updateStatus.state === 'checking' ||
    updateStatus.state === 'idle' ||
    updateStatus.state === 'not-available'
  ) {
    // Why: a new check cycle has started or completed cleanly. Clear the
    // cached version so a subsequent check failure cannot be mis-classified
    // as a download failure based on a stale version from a prior cycle.
    updateVersionRef.current = null
  }
  const [appVersion, setAppVersion] = useState<string | null>(null)
  const [autoSaveDelayDraft, setAutoSaveDelayDraft] = useState(
    String(settings.editorAutoSaveDelayMs)
  )
  const [openInApplicationsDraft, setOpenInApplicationsDraft] = useState<OpenInApplication[]>(
    settings.openInApplications ?? []
  )
  // Why: the star state is derived from gh, not from settings, so it does not
  // live in the global settings store. 'hidden' covers the gh-unavailable and
  // already-starred-on-a-previous-session cases so the section drops out for
  // users who can't or don't need to act.
  //
  // We start in 'loading' and render a placeholder at the exact same
  // dimensions as the resolved section. When gh resolves to 'hidden', the
  // placeholder collapses with a grid-rows transition so content above it
  // doesn't shift; anything below (nothing today, but future-proof) eases up.
  const [starState, setStarState] = useState<
    'loading' | 'not-starred' | 'starred' | 'starring' | 'hidden' | 'error'
  >('loading')

  useEffect(() => {
    window.api.updater.getVersion().then(setAppVersion)
  }, [])

  useEffect(() => {
    let cancelled = false
    void window.api.gh.checkOrcaStarred().then((result) => {
      if (cancelled) {
        return
      }
      if (result === null) {
        setStarState('hidden')
      } else {
        setStarState(result ? 'starred' : 'not-starred')
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const handleStarClick = async (): Promise<void> => {
    if (starState !== 'not-starred' && starState !== 'error') {
      return
    }
    setStarState('starring')
    const ok = await window.api.gh.starOrca()
    if (!ok) {
      setStarState('error')
      return
    }
    setStarState('starred')
    // Why: clicking star anywhere should also permanently mute the
    // threshold-based nag so the user isn't re-prompted via the popup.
    await window.api.starNag.complete()
  }

  useEffect(() => {
    setAutoSaveDelayDraft(String(settings.editorAutoSaveDelayMs))
  }, [settings.editorAutoSaveDelayMs])

  useEffect(() => {
    setOpenInApplicationsDraft(settings.openInApplications ?? [])
  }, [settings.openInApplications])

  const commitOpenInApplications = (applications: OpenInApplication[]): void => {
    if (!shouldCommitOpenInApplicationsDraft(applications)) {
      return
    }
    updateSettings({ openInApplications: applications })
  }

  const applyOpenInApplicationsDraft = (applications: OpenInApplication[]): void => {
    setOpenInApplicationsDraft(applications)
    commitOpenInApplications(applications)
  }

  const handleBrowseWorkspace = async () => {
    const path = await window.api.repos.pickFolder()
    if (path) {
      updateSettings({ workspaceDir: path })
    }
  }

  const commitAutoSaveDelay = (): void => {
    const trimmed = autoSaveDelayDraft.trim()
    if (trimmed === '') {
      setAutoSaveDelayDraft(String(settings.editorAutoSaveDelayMs))
      return
    }

    const value = Number(trimmed)
    if (!Number.isFinite(value)) {
      setAutoSaveDelayDraft(String(settings.editorAutoSaveDelayMs))
      return
    }

    const next = clampNumber(
      Math.round(value),
      MIN_EDITOR_AUTO_SAVE_DELAY_MS,
      MAX_EDITOR_AUTO_SAVE_DELAY_MS
    )
    updateSettings({ editorAutoSaveDelayMs: next })
    setAutoSaveDelayDraft(String(next))
  }

  const handleRestartToUpdate = (): void => {
    // Why: quitAndInstall resolves immediately (the actual quit happens in a
    // deferred timer in the main process), so rejection here is only possible
    // if the IPC channel itself breaks. Log defensively; the user will notice
    // the app didn't restart and can retry.
    void window.api.updater.quitAndInstall().catch(console.error)
  }

  const { t } = useTranslation()

  const visibleSections = [
    matchesSettingsSearch(searchQuery, getGeneralPaneSearchEntries(t)) ? (
      <section key="language" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.general.title')}</h3>
          <p className="text-xs text-muted-foreground">{t('settings.general.description')}</p>
        </div>
        <SearchableSetting
          title={t('settings.general.language.label')}
          description={t('settings.general.language.description')}
          keywords={['language', 'locale', 'i18n', '中文', 'english']}
          className="flex items-center justify-between gap-4 px-1 py-2"
        >
          <div className="space-y-0.5">
            <Label>{t('settings.general.language.label')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.general.language.description')}
            </p>
          </div>
          <Select
            value={resolveLanguagePreference(settings.language)}
            onValueChange={(v) => updateSettings({ language: v })}
          >
            <SelectTrigger size="sm" className="h-7 text-xs w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ORCA_LANGUAGES.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {ORCA_LANGUAGE_LABELS[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SearchableSetting>
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, getGeneralWorkspaceSearchEntries(t)) ? (
      <section key="workspace" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.general.workspace.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.general.workspace.description')}
          </p>
        </div>

        <SearchableSetting
          title={t('settings.general.workspace.directory.label')}
          description={t('settings.general.workspace.directory.description')}
          keywords={['workspace', 'folder', 'path', 'worktree']}
          className="space-y-2"
        >
          <Label>{t('settings.general.workspace.directory.label')}</Label>
          <div className="flex gap-2">
            <Input
              value={settings.workspaceDir}
              onChange={(e) => updateSettings({ workspaceDir: e.target.value })}
              className="flex-1 text-xs"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleBrowseWorkspace}
              className="shrink-0 gap-1.5"
            >
              <FolderOpen className="size-3.5" />
              {t('common.browse')}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {t('settings.general.workspace.directory.description')}
          </p>
        </SearchableSetting>

        <SearchableSetting
          title={t('settings.general.workspace.nest.label')}
          description={t('settings.general.workspace.nest.description')}
          keywords={['nested', 'subfolder', 'directory']}
          className="flex items-center justify-between gap-4 px-1 py-2"
        >
          <div className="space-y-0.5">
            <Label>{t('settings.general.workspace.nest.label')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.general.workspace.nest.description')}
            </p>
          </div>
          <button
            role="switch"
            aria-checked={settings.nestWorkspaces}
            onClick={() =>
              updateSettings({
                nestWorkspaces: !settings.nestWorkspaces
              })
            }
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
              settings.nestWorkspaces ? 'bg-foreground' : 'bg-muted-foreground/30'
            }`}
          >
            <span
              className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
                settings.nestWorkspaces ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </button>
        </SearchableSetting>

        {/* Why: the "Don't ask again" toast in the delete-worktree dialog
            deep-links here, so the wrapper id must stay stable. Renaming it
            breaks that toast action even though this pane still renders fine. */}
        <div id="general-skip-delete-worktree-confirm" className="scroll-mt-6">
          <SearchableSetting
            title={t('settings.general.workspace.askBeforeDeletingWorktrees.label')}
            description={t('settings.general.workspace.askBeforeDeletingWorktrees.description')}
            keywords={['delete', 'worktree', 'confirm', 'dialog', 'skip', 'prompt']}
            className="flex items-center justify-between gap-4 px-1 py-2"
          >
            <div className="space-y-0.5">
              <Label>{t('settings.general.workspace.skipDeleteWorktreeConfirm.label')}</Label>
              <p className="text-xs text-muted-foreground">
                {t('settings.general.workspace.skipDeleteWorktreeConfirm.description')}
              </p>
            </div>
            <button
              role="switch"
              aria-checked={!settings.skipDeleteWorktreeConfirm}
              onClick={() =>
                updateSettings({
                  skipDeleteWorktreeConfirm: !settings.skipDeleteWorktreeConfirm
                })
              }
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
                !settings.skipDeleteWorktreeConfirm ? 'bg-foreground' : 'bg-muted-foreground/30'
              }`}
            >
              <span
                className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
                  !settings.skipDeleteWorktreeConfirm ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
          </SearchableSetting>
        </div>

        <div id="general-skip-delete-automation-confirm" className="scroll-mt-6">
          <SearchableSetting
            title={t('settings.general.workspace.skipDeleteAutomationConfirm.label')}
            description={t('settings.general.workspace.skipDeleteAutomationConfirm.description')}
            keywords={['delete', 'automation', 'confirm', 'dialog', 'skip', 'prompt']}
            className="flex items-center justify-between gap-4 px-1 py-2"
          >
            <div className="space-y-0.5">
              <Label>{t('settings.general.workspace.skipDeleteAutomationConfirm.label')}</Label>
              <p className="text-xs text-muted-foreground">
                {t('settings.general.workspace.skipDeleteAutomationConfirm.description')}
              </p>
            </div>
            <button
              role="switch"
              aria-checked={!settings.skipDeleteAutomationConfirm}
              onClick={() =>
                updateSettings({
                  skipDeleteAutomationConfirm: !settings.skipDeleteAutomationConfirm
                })
              }
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
                !settings.skipDeleteAutomationConfirm ? 'bg-foreground' : 'bg-muted-foreground/30'
              }`}
            >
              <span
                className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
                  !settings.skipDeleteAutomationConfirm ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
          </SearchableSetting>
        </div>

        <SearchableSetting
          title={t('settings.general.openInMenu.title')}
          description={t('settings.general.openInMenu.description')}
          keywords={['open in', 'editor', 'launcher', 'cursor', 'zed', 'command', 'vscode']}
          className="space-y-3"
        >
          <div className="space-y-1">
            <Label>{t('settings.general.openInMenu.title')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.general.openInMenu.vsCodeIncluded')}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('settings.general.openInMenu.commandNotShellParsed')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                applyOpenInApplicationsDraft([
                  ...openInApplicationsDraft,
                  createPresetOpenInApplication('Cursor', 'cursor')
                ])
              }
            >
              {t('settings.general.openInMenu.addCursor')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                applyOpenInApplicationsDraft([
                  ...openInApplicationsDraft,
                  createPresetOpenInApplication('Zed', 'zed')
                ])
              }
            >
              {t('settings.general.openInMenu.addZed')}
            </Button>
          </div>
          <div className="space-y-2">
            {openInApplicationsDraft.map((app, index) => (
              <div key={app.id} className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]">
                <Input
                  value={app.label}
                  placeholder={t('settings.general.openInMenu.labelPlaceholder')}
                  onChange={(event) => {
                    const next = [...openInApplicationsDraft]
                    next[index] = { ...app, label: event.target.value }
                    setOpenInApplicationsDraft(next)
                  }}
                  onBlur={() => commitOpenInApplications(openInApplicationsDraft)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      commitOpenInApplications(openInApplicationsDraft)
                    }
                  }}
                />
                <Input
                  value={app.command}
                  placeholder={t('settings.general.openInMenu.commandPlaceholder')}
                  onChange={(event) => {
                    const next = [...openInApplicationsDraft]
                    next[index] = { ...app, command: event.target.value }
                    setOpenInApplicationsDraft(next)
                  }}
                  onBlur={() => commitOpenInApplications(openInApplicationsDraft)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      commitOpenInApplications(openInApplicationsDraft)
                    }
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const next = openInApplicationsDraft.filter((entry) => entry.id !== app.id)
                    setOpenInApplicationsDraft(next)
                    commitOpenInApplications(next)
                  }}
                >
                  {t('settings.general.openInMenu.remove')}
                </Button>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setOpenInApplicationsDraft([...openInApplicationsDraft, createOpenInApplication()])
            }
            disabled={openInApplicationsDraft.length >= OPEN_IN_APPLICATIONS_MAX}
          >
            {t('settings.general.openInMenu.addCustomLauncher')}
          </Button>
        </SearchableSetting>
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, getGeneralEditorSearchEntries(t)) ? (
      <section key="editor" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.general.editor.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.general.editor.description')}
          </p>
        </div>

        <SearchableSetting
          title={t('settings.general.editor.autoSave.label')}
          description={t('settings.general.editor.autoSave.description')}
          keywords={['autosave', 'save']}
          className="flex items-center justify-between gap-4 px-1 py-2"
        >
          <div className="space-y-0.5">
            <Label>{t('settings.general.editor.autoSave.label')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.general.editor.autoSave.description')}
            </p>
          </div>
          <button
            role="switch"
            aria-checked={settings.editorAutoSave}
            onClick={() =>
              updateSettings({
                editorAutoSave: !settings.editorAutoSave
              })
            }
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
              settings.editorAutoSave ? 'bg-foreground' : 'bg-muted-foreground/30'
            }`}
          >
            <span
              className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
                settings.editorAutoSave ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </button>
        </SearchableSetting>

        <SearchableSetting
          title={t('settings.general.editor.autoSaveDelay.label')}
          description={t('settings.general.editor.autoSaveDelay.description')}
          keywords={['autosave', 'delay', 'milliseconds']}
          className="flex items-center justify-between gap-4 px-1 py-2"
        >
          <div className="space-y-0.5">
            <Label>{t('settings.general.editor.autoSaveDelay.label')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.general.editor.autoSaveDelay.description')}{' '}
              {t('settings.general.editor.autoSaveDelay.firstLaunchDefault', {
                default: DEFAULT_EDITOR_AUTO_SAVE_DELAY_MS
              })}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Input
              type="number"
              min={MIN_EDITOR_AUTO_SAVE_DELAY_MS}
              max={MAX_EDITOR_AUTO_SAVE_DELAY_MS}
              step={250}
              value={autoSaveDelayDraft}
              onChange={(e) => setAutoSaveDelayDraft(e.target.value)}
              onBlur={commitAutoSaveDelay}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  commitAutoSaveDelay()
                }
              }}
              className="number-input-clean w-28 text-right tabular-nums"
            />
            <span className="text-xs text-muted-foreground">ms</span>
          </div>
        </SearchableSetting>

        <SearchableSetting
          title={t('settings.general.editor.defaultDiffView.label')}
          description={t('settings.general.editor.defaultDiffView.description')}
          keywords={['diff', 'view', 'inline', 'side-by-side', 'split']}
          className="flex flex-col items-start gap-3 px-1 py-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="space-y-0.5">
            <Label>{t('settings.general.editor.defaultDiffView.label')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.general.editor.defaultDiffView.description')}
            </p>
          </div>
          <div className="flex shrink-0 items-center rounded-md border border-border/60 bg-background/50 p-0.5">
            {(['inline', 'side-by-side'] as const).map((option) => (
              <button
                key={option}
                onClick={() => updateSettings({ diffDefaultView: option })}
                className={`rounded-sm px-3 py-1 text-sm transition-colors ${
                  settings.diffDefaultView === option
                    ? 'bg-accent font-medium text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {option === 'inline'
                  ? t('settings.general.editor.defaultDiffView.inline')
                  : t('settings.general.editor.defaultDiffView.sideBySide')}
              </button>
            ))}
          </div>
        </SearchableSetting>

        <SearchableSetting
          title={t('settings.general.editor.defaultDiffFileTree.label')}
          description={t('settings.general.editor.defaultDiffFileTree.description')}
          keywords={['diff', 'tree', 'file tree', 'combined diff', 'sidebar']}
          className="flex flex-col items-start gap-3 px-1 py-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="space-y-0.5">
            <Label>{t('settings.general.editor.defaultDiffFileTree.label')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.general.editor.defaultDiffFileTree.description')}
            </p>
          </div>
          <div className="flex shrink-0 items-center rounded-md border border-border/60 bg-background/50 p-0.5">
            {[
              {
                label: t('settings.general.editor.defaultDiffFileTree.shown'),
                value: true
              },
              {
                label: t('settings.general.editor.defaultDiffFileTree.hidden'),
                value: false
              }
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() =>
                  updateSettings({ combinedDiffFileTreeVisibleByDefault: option.value })
                }
                className={`rounded-sm px-3 py-1 text-sm transition-colors ${
                  settings.combinedDiffFileTreeVisibleByDefault === option.value
                    ? 'bg-accent font-medium text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </SearchableSetting>

        <SearchableSetting
          title={t('settings.general.editor.minimap.label')}
          description={t('settings.general.editor.minimap.description')}
          keywords={['minimap', 'overview', 'code', 'scroll']}
          className="flex items-center justify-between gap-4 px-1 py-2"
        >
          <div className="space-y-0.5">
            <Label>{t('settings.general.editor.minimap.label')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.general.editor.minimap.description')}
            </p>
          </div>
          <button
            role="switch"
            aria-checked={settings.editorMinimapEnabled}
            onClick={() =>
              updateSettings({
                editorMinimapEnabled: !settings.editorMinimapEnabled
              })
            }
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
              settings.editorMinimapEnabled ? 'bg-foreground' : 'bg-muted-foreground/30'
            }`}
          >
            <span
              className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
                settings.editorMinimapEnabled ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </button>
        </SearchableSetting>

        <SearchableSetting
          title={t('settings.general.editor.markdownReviewNotes.label')}
          description={t('settings.general.editor.markdownReviewNotes.description')}
          keywords={['markdown', 'review', 'notes', 'annotations', 'agents']}
          className="flex items-center justify-between gap-4 px-1 py-2"
        >
          <div className="space-y-0.5">
            <Label>{t('settings.general.editor.markdownReviewNotes.label')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.general.editor.markdownReviewNotes.description')}
            </p>
          </div>
          <button
            role="switch"
            aria-checked={settings.markdownReviewToolsEnabled}
            onClick={() =>
              updateSettings({
                markdownReviewToolsEnabled: !settings.markdownReviewToolsEnabled
              })
            }
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
              settings.markdownReviewToolsEnabled ? 'bg-foreground' : 'bg-muted-foreground/30'
            }`}
          >
            <span
              className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
                settings.markdownReviewToolsEnabled ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </button>
        </SearchableSetting>
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, getGeneralCliSearchEntries(t)) ? (
      <CliSection
        key="cli"
        currentPlatform={navigator.userAgent.includes('Mac') ? 'darwin' : 'other'}
      />
    ) : null,
    matchesSettingsSearch(searchQuery, getGeneralCacheTimerSearchEntries(t)) ? (
      <section key="cache-timer" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.general.cacheTimer.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.general.cacheTimer.description')}
          </p>
        </div>

        <SearchableSetting
          title={t('settings.general.cacheTimer.cacheTimer.label')}
          description={t('settings.general.cacheTimer.cacheTimer.description')}
          // Why: this is the primary control for the section gated by
          // GENERAL_CACHE_TIMER_SEARCH_ENTRIES (title "Prompt Cache Timer").
          // Mirroring those keywords keeps a search for "Prompt Cache Timer"
          // from rendering the section header with no body underneath.
          keywords={getGeneralCacheTimerSearchEntries(t).flatMap((entry) => [
            entry.title,
            entry.description ?? '',
            ...(entry.keywords ?? [])
          ])}
          className="flex items-center justify-between gap-4 px-1 py-2"
        >
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Timer className="size-4" />
              <Label>{t('settings.general.cacheTimer.cacheTimer.label')}</Label>
            </div>
            <p className="text-xs text-muted-foreground">
              {t('settings.general.cacheTimer.cacheTimer.description')}
            </p>
          </div>
          <button
            role="switch"
            aria-checked={settings.promptCacheTimerEnabled}
            aria-label={t('settings.general.cacheTimer.cacheTimer.label')}
            onClick={() => {
              const enabling = !settings.promptCacheTimerEnabled
              updateSettings({ promptCacheTimerEnabled: enabling })
              // Why: if enabling mid-session, seed timers for any Claude tabs that
              // are already idle — their working→idle transition already happened
              // and won't re-fire.
              if (enabling) {
                useAppStore.getState().seedCacheTimersForIdleTabs()
              }
            }}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
              settings.promptCacheTimerEnabled ? 'bg-foreground' : 'bg-muted-foreground/30'
            }`}
          >
            <span
              className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
                settings.promptCacheTimerEnabled ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </button>
        </SearchableSetting>

        {settings.promptCacheTimerEnabled && (
          <SearchableSetting
            title={t('settings.general.cacheTimer.timerDuration.label')}
            description={t('settings.general.cacheTimer.timerDuration.description')}
            keywords={['cache', 'timer', 'duration', 'ttl']}
            className="flex items-center justify-between gap-4 px-1 py-2 pl-7"
          >
            <div className="space-y-0.5">
              <Label>{t('settings.general.cacheTimer.timerDuration.label')}</Label>
              <p className="text-xs text-muted-foreground">
                {t('settings.general.cacheTimer.timerDuration.description')}
              </p>
            </div>
            <Select
              value={String(settings.promptCacheTtlMs)}
              onValueChange={(v) => updateSettings({ promptCacheTtlMs: Number(v) })}
            >
              <SelectTrigger size="sm" className="h-7 text-xs w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="300000">
                  {t('settings.general.cacheTimer.fiveMinutes')}
                </SelectItem>
                <SelectItem value="3600000">{t('settings.general.cacheTimer.oneHour')}</SelectItem>
              </SelectContent>
            </Select>
          </SearchableSetting>
        )}
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, getGeneralUpdateSearchEntries(t)) ? (
      <section key="updates" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.general.updates.title')}</h3>
          <p className="text-xs text-muted-foreground">Current version: {appVersion ?? '…'}</p>
        </div>

        <SearchableSetting
          title={t('settings.general.updates.check.label')}
          description={t('settings.general.updates.check.description')}
          keywords={['update', 'version', 'release notes', 'download']}
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              // Why: Shift-click opts this check into the release-candidate
              // channel. Keep the affordance hidden — it's a power-user
              // shortcut, not a discoverable toggle.
              onClick={(event) =>
                window.api.updater.check({
                  includePrerelease: event.shiftKey
                })
              }
              disabled={updateStatus.state === 'checking' || updateStatus.state === 'downloading'}
              className="gap-2"
            >
              {updateStatus.state === 'checking' ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <RefreshCw className="size-3.5" />
              )}
              {t('settings.general.updates.check.label')}
            </Button>

            {updateStatus.state === 'available' ? (
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  void window.api.updater.download().catch((error) => {
                    toast.error('Could not start the update download.', {
                      description: String((error as Error)?.message ?? error)
                    })
                  })
                }}
                className="gap-2"
              >
                <Download className="size-3.5" />
                Install Update ({updateStatus.version})
              </Button>
            ) : updateStatus.state === 'downloaded' ? (
              <Button variant="default" size="sm" onClick={handleRestartToUpdate} className="gap-2">
                <Download className="size-3.5" />
                Restart to Update ({updateStatus.version})
              </Button>
            ) : null}
          </div>

          <p className="text-xs text-muted-foreground">
            {updateStatus.state === 'idle' && 'Updates are checked automatically on launch.'}
            {updateStatus.state === 'checking' && 'Checking for updates...'}
            {updateStatus.state === 'available' && (
              <>
                Version {updateStatus.version} is available. Click &quot;Install Update&quot; to
                download and install it.{' '}
                <a
                  href={
                    updateStatus.releaseUrl ??
                    `https://github.com/stablyai/orca/releases/tag/v${updateStatus.version}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  Release notes
                </a>
              </>
            )}
            {updateStatus.state === 'not-available' && 'You\u2019re on the latest version.'}
            {updateStatus.state === 'downloading' &&
              `Downloading v${updateStatus.version}... ${updateStatus.percent}%`}
            {updateStatus.state === 'downloaded' && (
              <>
                Version {updateStatus.version} is ready to install.{' '}
                <a
                  href={
                    updateStatus.releaseUrl ??
                    `https://github.com/stablyai/orca/releases/tag/v${updateStatus.version}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  Release notes
                </a>
              </>
            )}
            {updateStatus.state === 'error' &&
              // Why: `{ state: 'error' }` is emitted for both check-time
              // failures (no version cached) and download/install failures
              // (version cached from a prior 'available'/'downloading'/
              // 'downloaded' state). Label accordingly so a download failure
              // isn't mislabeled as a "check" failure. Mirrors UpdateCard.tsx.
              (updateVersionRef.current
                ? `Update error. ${updateStatus.message}`
                : `Update check failed. ${updateStatus.message}`)}
          </p>
        </SearchableSetting>
      </section>
    ) : null
    // Note: the Support section is rendered outside this array so it can own
    // its own loading placeholder and its own collapsing Separator. Without
    // that separation, a dangling divider would remain above the collapsed
    // section.
  ].filter(Boolean)

  return (
    <div className="space-y-8">
      {visibleSections.map((section, index) => (
        <div key={index} className="space-y-8">
          {index > 0 ? <Separator /> : null}
          {section}
        </div>
      ))}
      {matchesSettingsSearch(searchQuery, getGeneralSupportSearchEntries(t)) ? (
        <SupportSection
          state={starState}
          hasPrecedingSections={visibleSections.length > 0}
          onStarClick={handleStarClick}
        />
      ) : null}
    </div>
  )
}

type SupportSectionProps = {
  state: 'loading' | 'not-starred' | 'starring' | 'starred' | 'hidden' | 'error'
  hasPrecedingSections: boolean
  onStarClick: () => void | Promise<void>
}

function SupportSection({
  state,
  hasPrecedingSections,
  onStarClick
}: SupportSectionProps): React.JSX.Element {
  const { t } = useTranslation()
  // Why: 'hidden' means gh is unavailable or the user had already starred on a
  // previous session — in both cases we collapse the entire section (including
  // its leading Separator) so the settings pane doesn't carry an empty strip.
  // For every other state we render the full row so the initial layout is
  // stable: the skeleton-to-live swap happens in place and a post-click
  // "Starred" confirmation does not shift anything above or below it.
  const collapsed = state === 'hidden'

  return (
    <section
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
        collapsed ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'
      }`}
      aria-hidden={collapsed}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="space-y-8">
          {hasPrecedingSections ? <Separator /> : null}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold">{t('settings.general.support.title')}</h3>
            </div>
            {state === 'loading' ? <SupportRowSkeleton /> : null}
            {state !== 'loading' && state !== 'hidden' ? (
              <SupportRow state={state} onStarClick={onStarClick} />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

function SupportRowSkeleton(): React.JSX.Element {
  return (
    <div className="flex items-center justify-between gap-4 px-1 py-2" aria-hidden="true">
      <div className="h-4 w-36 rounded bg-muted/50 animate-pulse" />
      <div className="h-8 w-24 rounded-md bg-muted/50 animate-pulse" />
    </div>
  )
}

function SupportRow({
  state,
  onStarClick
}: {
  state: 'not-starred' | 'starring' | 'starred' | 'error'
  onStarClick: () => void | Promise<void>
}): React.JSX.Element {
  const { t } = useTranslation()
  // Why: the left-hand label is the setting's identity and must not change
  // when the user clicks — the row should still read "Star Orca on GitHub"
  // afterwards. The right-hand control is what changes: before starring it
  // is a button; after a successful star we swap in a small inline "Thanks"
  // confirmation so the row keeps the same shape without showing a stale,
  // disabled button.
  return (
    <SearchableSetting
      title={t('settings.general.support.starGithub.label')}
      description={t('settings.general.support.starGithub.description')}
      keywords={['star', 'github', 'support', 'feedback', 'like']}
      className="flex items-center justify-between gap-4 px-1 py-2"
    >
      <Label>{t('settings.general.support.starGithub.label')}</Label>
      {state === 'starred' ? (
        <SupportRowThanks />
      ) : (
        <Button
          variant="default"
          size="sm"
          onClick={() => void onStarClick()}
          disabled={state === 'starring'}
          className="shrink-0 gap-1.5"
        >
          {state === 'starring' ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Star className="size-3.5" />
          )}
          {state === 'starring' ? 'Starring…' : state === 'error' ? 'Try Again' : 'Star'}
        </Button>
      )}
    </SearchableSetting>
  )
}

function SupportRowThanks(): React.JSX.Element {
  const { t } = useTranslation()
  // Why: match the size="sm" button's h-8 / gap-1.5 / px-3 dimensions so the
  // row height stays identical when the button is swapped out. Without the
  // fixed height, the text baseline collapses ~6px and the entire row
  // shrinks, shifting everything below.
  return (
    <div
      className="shrink-0 inline-flex h-8 items-center gap-1.5 px-3 text-sm font-medium
        text-amber-400/90 animate-in fade-in slide-in-from-right-1 duration-300"
      role="status"
      aria-live="polite"
    >
      <Star className="size-3.5 fill-amber-400/80 text-amber-400/80" aria-hidden="true" />
      {t('settings.general.support.thanks')}
    </div>
  )
}
