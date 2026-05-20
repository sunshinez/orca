import { useTranslation } from 'react-i18next'
import type { GlobalSettings, StatusBarItem } from '../../../../shared/types'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { UIZoomControl } from './UIZoomControl'
import { SearchableSetting } from './SearchableSetting'
import { matchesSettingsSearch, type SettingsSearchEntry } from './settings-search'
import { useAppStore } from '../../store'
import { FontAutocomplete } from './SettingsFormControls'
import { DEFAULT_APP_FONT_FAMILY } from '../../../../shared/constants'
import { useAvailableStatusBarToggles } from '../status-bar/use-available-status-bar-toggles'

type AppearancePaneProps = {
  settings: GlobalSettings
  updateSettings: (updates: Partial<GlobalSettings>) => void
  applyTheme: (theme: 'system' | 'dark' | 'light') => void
  fontSuggestions: string[]
}

function ToggleSwitchButton({
  checked,
  onToggle,
  ariaLabel
}: {
  checked: boolean
  onToggle: () => void
  ariaLabel?: string
}): React.JSX.Element {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onToggle}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
        checked ? 'bg-foreground' : 'bg-muted-foreground/30'
      }`}
    >
      <span
        className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

const STATUS_BAR_TOGGLES: readonly {
  id: StatusBarItem
  title: string
  description: string
  keywords: string[]
  toggleDescription: string
}[] = [
  {
    id: 'claude',
    title: 'Claude Usage',
    description: 'Show Claude token and cost usage in the status bar.',
    keywords: ['status bar', 'claude', 'usage', 'tokens', 'cost', 'anthropic'],
    toggleDescription: 'Show Claude token and cost usage for the active workspace.'
  },
  {
    id: 'codex',
    title: 'Codex Usage',
    description: 'Show Codex token and cost usage in the status bar.',
    keywords: ['status bar', 'codex', 'usage', 'tokens', 'cost', 'openai'],
    toggleDescription: 'Show Codex token and cost usage for the active workspace.'
  },
  {
    id: 'gemini',
    title: 'Gemini Usage',
    description: 'Show Gemini token and cost usage in the status bar.',
    keywords: ['status bar', 'gemini', 'usage', 'tokens', 'cost', 'google'],
    toggleDescription: 'Show Gemini token and cost usage for the active workspace.'
  },
  {
    id: 'opencode-go',
    title: 'OpenCode Go Usage',
    description: 'Show OpenCode Go token and cost usage in the status bar.',
    keywords: ['status bar', 'opencode', 'opencode-go', 'usage', 'tokens', 'cost'],
    toggleDescription: 'Show OpenCode Go token and cost usage for the active workspace.'
  },
  {
    id: 'ssh',
    title: 'SSH Status',
    description: 'Show the active SSH connection status in the status bar.',
    keywords: ['status bar', 'ssh', 'remote', 'connection', 'host'],
    toggleDescription:
      'Show the active SSH connection. Only visible once an SSH target is configured.'
  },
  {
    id: 'resource-usage',
    title: 'Resource Manager',
    description: 'Show CPU, memory, terminal sessions, and workspace disk usage in the status bar.',
    keywords: ['status bar', 'resource', 'manager', 'memory', 'cpu', 'terminal', 'disk', 'space'],
    toggleDescription:
      'Show the Resource Manager. Click it for CPU, memory, sessions, daemon controls, and workspace disk scans.'
  }
]

const THEME_ENTRIES: SettingsSearchEntry[] = [
  {
    title: 'Theme',
    description: 'Choose how Orca looks in the app window.',
    keywords: ['dark', 'light', 'system']
  }
]

const ZOOM_ENTRIES: SettingsSearchEntry[] = [
  {
    title: 'UI Zoom',
    description: 'Scale the entire application interface.',
    keywords: ['zoom', 'scale', 'shortcut']
  }
]

const TYPOGRAPHY_ENTRIES: SettingsSearchEntry[] = [
  {
    title: 'IDE Font',
    description: 'Choose the font used by the Orca interface.',
    keywords: ['font', 'typeface', 'typography', 'ide', 'orca', 'interface', 'app', 'ui']
  }
]

const LAYOUT_ENTRIES: SettingsSearchEntry[] = [
  {
    title: 'Open Right Sidebar by Default',
    description: 'Automatically expand the file explorer panel when creating a new worktree.',
    keywords: ['layout', 'file explorer', 'sidebar']
  },
  {
    title: 'Show Git-Ignored Files',
    description: 'Dim files matched by .gitignore in the file explorer.',
    keywords: ['git', 'gitignore', 'ignored', 'file explorer', 'sidebar', 'hide']
  }
]

const TITLEBAR_ENTRIES: SettingsSearchEntry[] = [
  {
    title: 'Titlebar App Name',
    description: 'Show Orca in the titlebar.',
    keywords: ['titlebar', 'orca', 'app', 'name', 'brand']
  }
]

const STATUS_BAR_ENTRIES: SettingsSearchEntry[] = STATUS_BAR_TOGGLES.map(
  ({ title, description, keywords }) => ({ title, description, keywords })
)

const SIDEBAR_ENTRIES: SettingsSearchEntry[] = [
  {
    title: 'Show Tasks Button',
    description: 'Show the Tasks button at the top of the left sidebar.',
    keywords: ['tasks', 'sidebar', 'button', 'hide', 'show', 'github', 'linear']
  }
]

export const APPEARANCE_PANE_SEARCH_ENTRIES: SettingsSearchEntry[] = [
  ...THEME_ENTRIES,
  ...TYPOGRAPHY_ENTRIES,
  ...ZOOM_ENTRIES,
  ...LAYOUT_ENTRIES,
  ...TITLEBAR_ENTRIES,
  ...STATUS_BAR_ENTRIES,
  ...SIDEBAR_ENTRIES
]

export function AppearancePane({
  settings,
  updateSettings,
  applyTheme,
  fontSuggestions
}: AppearancePaneProps): React.JSX.Element {
  const { t } = useTranslation()
  const searchQuery = useAppStore((state) => state.settingsSearchQuery)
  const isMac = navigator.userAgent.includes('Mac')
  const zoomInLabel = isMac ? '⌘+' : 'Ctrl +'
  const zoomOutLabel = isMac ? '⌘-' : 'Ctrl -'
  const statusBarItems = useAppStore((state) => state.statusBarItems)
  const toggleStatusBarItem = useAppStore((state) => state.toggleStatusBarItem)
  const visibleStatusBarToggles = useAvailableStatusBarToggles(STATUS_BAR_TOGGLES)

  const visibleSections = [
    matchesSettingsSearch(searchQuery, THEME_ENTRIES) ? (
      <section key="theme" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.appearance.theme.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.appearance.theme.description')}
          </p>
        </div>

        <SearchableSetting
          title={t('settings.appearance.theme.title')}
          description={t('settings.appearance.theme.description')}
          keywords={['dark', 'light', 'system']}
        >
          <div className="flex w-fit gap-1 rounded-md border border-border/50 p-1">
            {(['system', 'dark', 'light'] as const).map((option) => (
              <button
                key={option}
                onClick={() => {
                  updateSettings({ theme: option })
                  applyTheme(option)
                }}
                className={`rounded-sm px-3 py-1 text-sm capitalize transition-colors ${
                  settings.theme === option
                    ? 'bg-accent font-medium text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </SearchableSetting>
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, ZOOM_ENTRIES) ? (
      <section key="zoom" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.appearance.zoom.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.appearance.zoom.description')} Use{' '}
            <kbd className="rounded border px-1 py-0.5 text-[10px]">{zoomInLabel}</kbd> /{' '}
            <kbd className="rounded border px-1 py-0.5 text-[10px]">{zoomOutLabel}</kbd> when not in
            a terminal pane.
          </p>
        </div>

        <SearchableSetting
          title={t('settings.appearance.zoom.title')}
          description={t('settings.appearance.zoom.description')}
          keywords={['zoom', 'scale', 'shortcut']}
        >
          <UIZoomControl />
        </SearchableSetting>
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, TYPOGRAPHY_ENTRIES) ? (
      <section key="typography" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.appearance.typography.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.appearance.typography.description')}
          </p>
        </div>

        <SearchableSetting
          title={t('settings.appearance.typography.label')}
          description={t('settings.appearance.typography.description')}
          keywords={['font', 'typeface', 'typography', 'ide', 'orca', 'interface', 'app', 'ui']}
          className="space-y-2"
        >
          <Label>{t('settings.appearance.typography.label')}</Label>
          <FontAutocomplete
            value={settings.appFontFamily}
            suggestions={fontSuggestions}
            placeholder={DEFAULT_APP_FONT_FAMILY}
            onChange={(value) =>
              updateSettings({ appFontFamily: value.trim() || DEFAULT_APP_FONT_FAMILY })
            }
          />
        </SearchableSetting>
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, LAYOUT_ENTRIES) ? (
      <section key="layout" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.appearance.layout.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.appearance.layout.description')}
          </p>
        </div>

        <SearchableSetting
          title={t('settings.appearance.layout.rightSidebar.label')}
          description={t('settings.appearance.layout.rightSidebar.description')}
          keywords={['layout', 'file explorer', 'sidebar']}
          className="flex items-center justify-between gap-4 px-1 py-2"
        >
          <div className="space-y-0.5">
            <Label>{t('settings.appearance.layout.rightSidebar.label')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.appearance.layout.rightSidebar.description')}
            </p>
          </div>
          <ToggleSwitchButton
            checked={settings.rightSidebarOpenByDefault}
            onToggle={() =>
              updateSettings({ rightSidebarOpenByDefault: !settings.rightSidebarOpenByDefault })
            }
          />
        </SearchableSetting>

        <SearchableSetting
          title={t('settings.appearance.layout.gitIgnored.label')}
          description={t('settings.appearance.layout.gitIgnored.description')}
          keywords={['git', 'gitignore', 'ignored', 'file explorer', 'sidebar', 'hide']}
          className="flex items-center justify-between gap-4 px-1 py-2"
        >
          <div className="space-y-0.5">
            <Label>{t('settings.appearance.layout.gitIgnored.label')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.appearance.layout.gitIgnored.description')}
            </p>
          </div>
          <ToggleSwitchButton
            checked={settings.showGitIgnoredFiles ?? true}
            onToggle={() =>
              updateSettings({ showGitIgnoredFiles: !(settings.showGitIgnoredFiles ?? true) })
            }
          />
        </SearchableSetting>
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, TITLEBAR_ENTRIES) ? (
      <section key="titlebar" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.appearance.titlebar.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.appearance.titlebar.description')}
          </p>
        </div>

        <SearchableSetting
          title={t('settings.appearance.titlebar.appName.label')}
          description={t('settings.appearance.titlebar.appName.description')}
          keywords={['titlebar', 'orca', 'app', 'name', 'brand']}
          className="flex items-center justify-between gap-4 px-1 py-2"
        >
          <div className="space-y-0.5">
            <Label>{t('settings.appearance.titlebar.appName.label')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.appearance.titlebar.appName.description')}
            </p>
          </div>
          <ToggleSwitchButton
            checked={settings.showTitlebarAppName}
            onToggle={() => updateSettings({ showTitlebarAppName: !settings.showTitlebarAppName })}
          />
        </SearchableSetting>
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, STATUS_BAR_ENTRIES) ? (
      <section key="status-bar" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.appearance.statusBar.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.appearance.statusBar.description')}
          </p>
        </div>

        {visibleStatusBarToggles.map((toggle) => {
          const enabled = statusBarItems.includes(toggle.id)
          return (
            <SearchableSetting
              key={toggle.id}
              title={toggle.title}
              description={toggle.description}
              keywords={toggle.keywords}
              className="flex items-center justify-between gap-4 px-1 py-2"
            >
              <div className="space-y-0.5">
                <Label>{toggle.title}</Label>
                <p className="text-xs text-muted-foreground">{toggle.toggleDescription}</p>
              </div>
              <ToggleSwitchButton
                checked={enabled}
                onToggle={() => toggleStatusBarItem(toggle.id)}
                ariaLabel={toggle.title}
              />
            </SearchableSetting>
          )
        })}
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, SIDEBAR_ENTRIES) ? (
      <section key="sidebar" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.appearance.sidebar.title')}</h3>
        </div>

        <SearchableSetting
          title={t('settings.appearance.sidebar.tasksButton.label')}
          description={t('settings.appearance.sidebar.tasksButton.description')}
          keywords={['tasks', 'sidebar', 'button', 'hide', 'show', 'github', 'linear']}
          className="flex items-center justify-between gap-4 px-1 py-2"
        >
          <div className="space-y-0.5">
            <Label>{t('settings.appearance.sidebar.tasksButton.label')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.appearance.sidebar.tasksButton.description')}
            </p>
          </div>
          <ToggleSwitchButton
            checked={settings.showTasksButton}
            onToggle={() => updateSettings({ showTasksButton: !settings.showTasksButton })}
          />
        </SearchableSetting>
      </section>
    ) : null
  ].filter(Boolean)

  return (
    <div className="space-y-8">
      {visibleSections.map((section, index) => (
        <div key={index} className="space-y-8">
          {index > 0 ? <Separator /> : null}
          {section}
        </div>
      ))}
    </div>
  )
}
