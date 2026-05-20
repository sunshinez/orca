import type { GlobalSettings } from '../../../../shared/types'
import { useTranslation } from 'react-i18next'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useAppStore } from '../../store'
import { GIT_PANE_SEARCH_ENTRIES } from './git-search'
import { SearchableSetting } from './SearchableSetting'
import { matchesSettingsSearch } from './settings-search'
import { GitHubRateLimitPanel } from '../github/github-rate-limit-display'

export { GIT_PANE_SEARCH_ENTRIES }

type GitPaneProps = {
  settings: GlobalSettings
  updateSettings: (updates: Partial<GlobalSettings>) => void
  displayedGitUsername: string
}

export function GitPane({
  settings,
  updateSettings,
  displayedGitUsername
}: GitPaneProps): React.JSX.Element {
  const { t } = useTranslation()
  const searchQuery = useAppStore((s) => s.settingsSearchQuery)

  const visibleSections = [
    matchesSettingsSearch(searchQuery, {
      title: t('settings.git.branchPrefix.title'),
      description: t('settings.git.branchPrefix.description'),
      keywords: ['branch naming', 'git username', 'custom']
    }) ? (
      <SearchableSetting
        key="branch-prefix"
        title={t('settings.git.branchPrefix.title')}
        description={t('settings.git.branchPrefix.description')}
        keywords={['branch naming', 'git username', 'custom']}
        className="space-y-3"
      >
        <div className="flex w-fit gap-1 rounded-md border border-border/50 p-1">
          {(['git-username', 'custom', 'none'] as const).map((option) => (
            <button
              key={option}
              onClick={() => updateSettings({ branchPrefix: option })}
              className={`rounded-sm px-3 py-1 text-sm transition-colors ${
                settings.branchPrefix === option
                  ? 'bg-accent font-medium text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {option === 'git-username'
                ? t('settings.git.branchPrefix.gitUsername')
                : option === 'custom'
                  ? t('settings.git.branchPrefix.custom')
                  : t('settings.git.branchPrefix.none')}
            </button>
          ))}
        </div>
        {(settings.branchPrefix === 'custom' || settings.branchPrefix === 'git-username') && (
          <Input
            value={
              settings.branchPrefix === 'git-username'
                ? displayedGitUsername
                : settings.branchPrefixCustom
            }
            onChange={(e) => updateSettings({ branchPrefixCustom: e.target.value })}
            placeholder={
              settings.branchPrefix === 'git-username'
                ? 'No git username configured'
                : 'e.g. feature'
            }
            className="max-w-xs"
            readOnly={settings.branchPrefix === 'git-username'}
          />
        )}
      </SearchableSetting>
    ) : null,
    matchesSettingsSearch(searchQuery, {
      title: t('settings.git.refreshLocalBaseRef.title'),
      description: t('settings.git.refreshLocalBaseRef.description'),
      keywords: ['main', 'master', 'origin/main', 'git diff', 'base ref', 'worktree']
    }) ? (
      <SearchableSetting
        key="refresh-base-ref"
        title={t('settings.git.refreshLocalBaseRef.title')}
        description={t('settings.git.refreshLocalBaseRef.description')}
        keywords={['main', 'master', 'origin/main', 'git diff', 'base ref', 'worktree']}
        className="flex items-center justify-between gap-4 px-1 py-2"
      >
        <div className="space-y-0.5">
          <Label>{t('settings.git.refreshLocalBaseRef.label')}</Label>
          <p className="text-xs text-muted-foreground">
            {t('settings.git.refreshLocalBaseRef.helper')}
          </p>
        </div>
        <button
          role="switch"
          aria-checked={settings.refreshLocalBaseRefOnWorktreeCreate}
          onClick={() =>
            updateSettings({
              refreshLocalBaseRefOnWorktreeCreate: !settings.refreshLocalBaseRefOnWorktreeCreate
            })
          }
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
            settings.refreshLocalBaseRefOnWorktreeCreate
              ? 'bg-foreground'
              : 'bg-muted-foreground/30'
          }`}
        >
          <span
            className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
              settings.refreshLocalBaseRefOnWorktreeCreate ? 'translate-x-4' : 'translate-x-0.5'
            }`}
          />
        </button>
      </SearchableSetting>
    ) : null,
    matchesSettingsSearch(searchQuery, {
      title: t('settings.git.githubApiBudget.title'),
      description: t('settings.git.githubApiBudget.description'),
      keywords: ['github', 'gh', 'graphql', 'rate limit', 'api budget']
    }) ? (
      <SearchableSetting
        key="github-api-budget"
        title={t('settings.git.githubApiBudget.title')}
        description={t('settings.git.githubApiBudget.description')}
        keywords={['github', 'gh', 'graphql', 'rate limit', 'api budget']}
        className="space-y-3"
      >
        <GitHubRateLimitPanel />
      </SearchableSetting>
    ) : null,
    matchesSettingsSearch(searchQuery, {
      title: t('settings.git.orcaAttribution.title'),
      description: t('settings.git.orcaAttribution.description'),
      keywords: ['github', 'gh', 'pr', 'issue', 'co-author', 'coauthored', 'attribution', 'orca']
    }) ? (
      <SearchableSetting
        key="github-attribution"
        title={t('settings.git.orcaAttribution.title')}
        description={t('settings.git.orcaAttribution.description')}
        keywords={['github', 'gh', 'pr', 'issue', 'co-author', 'coauthored', 'attribution', 'orca']}
        className="flex items-center justify-between gap-4 px-1 py-2"
      >
        <div className="space-y-0.5">
          <Label>{t('settings.git.orcaAttribution.label')}</Label>
          <p className="text-xs text-muted-foreground">
            {t('settings.git.orcaAttribution.helper')}
          </p>
        </div>
        <button
          role="switch"
          aria-checked={settings.enableGitHubAttribution}
          onClick={() =>
            updateSettings({
              enableGitHubAttribution: !settings.enableGitHubAttribution
            })
          }
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
            settings.enableGitHubAttribution ? 'bg-foreground' : 'bg-muted-foreground/30'
          }`}
        >
          <span
            className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
              settings.enableGitHubAttribution ? 'translate-x-4' : 'translate-x-0.5'
            }`}
          />
        </button>
      </SearchableSetting>
    ) : null
  ].filter(Boolean)

  return <div className="space-y-4">{visibleSections}</div>
}
