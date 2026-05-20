/* eslint-disable max-lines -- Why: TerminalPane is the single owner of all terminal settings UI;
   splitting individual settings into separate files would scatter related controls without a
   meaningful abstraction boundary. Mirrors the same decision made for GeneralPane.tsx. */
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type {
  FloatingTerminalTriggerLocation,
  GlobalSettings,
  SetupScriptLaunchMode
} from '../../../../shared/types'
import {
  DEFAULT_TERMINAL_FONT_WEIGHT,
  TERMINAL_FONT_WEIGHT_MAX,
  TERMINAL_FONT_WEIGHT_MIN,
  TERMINAL_FONT_WEIGHT_STEP,
  normalizeTerminalFontWeight
} from '../../../../shared/terminal-fonts'
import {
  fontFamilyHasKnownLigatures,
  resolveTerminalLigaturesEnabled
} from '../../../../shared/terminal-ligatures'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { FolderOpen, Minus, Plus } from 'lucide-react'
import {
  clampNumber,
  resolveEffectiveTerminalAppearance,
  resolvePaneStyleOptions
} from '@/lib/terminal-theme'
import { NumberField, FontAutocomplete } from './SettingsFormControls'
import { SCROLLBACK_PRESETS_MB } from './SettingsConstants'
import { SearchableSetting } from './SearchableSetting'
import { matchesSettingsSearch } from './settings-search'
import { useAppStore } from '../../store'
import { isMacUserAgent, isWindowsUserAgent } from '@/components/terminal-pane/pane-helpers'
import {
  MANAGE_SESSIONS_SEARCH_ENTRIES,
  TERMINAL_ADVANCED_SEARCH_ENTRIES,
  TERMINAL_CURSOR_SEARCH_ENTRIES,
  TERMINAL_DARK_THEME_SEARCH_ENTRIES,
  TERMINAL_LIGHT_THEME_SEARCH_ENTRIES,
  TERMINAL_MAC_OPTION_SEARCH_ENTRIES,
  TERMINAL_FLOATING_SEARCH_ENTRIES,
  TERMINAL_PANE_STYLE_SEARCH_ENTRIES,
  TERMINAL_QUICK_COMMANDS_SEARCH_ENTRIES,
  TERMINAL_RENDERING_SEARCH_ENTRIES,
  TERMINAL_SETUP_SCRIPT_SEARCH_ENTRIES,
  TERMINAL_TYPOGRAPHY_SEARCH_ENTRIES,
  TERMINAL_WINDOW_SEARCH_ENTRIES
} from './terminal-search'
import {
  TERMINAL_RIGHT_CLICK_TO_PASTE_SEARCH_ENTRY,
  TERMINAL_WINDOWS_POWERSHELL_IMPLEMENTATION_SEARCH_ENTRY,
  TERMINAL_WINDOWS_SHELL_SEARCH_ENTRY
} from './terminal-windows-search'
import { useDetectedOptionAsAlt } from '@/lib/keyboard-layout/use-effective-mac-option-as-alt'
import { detectedCategoryToDefault } from '@/lib/keyboard-layout/detect-option-as-alt'
import { DarkTerminalThemeSection, LightTerminalThemeSection } from './TerminalThemeSections'
import { TerminalWindowSection } from './TerminalWindowSection'
import { GhosttyImportModal } from './GhosttyImportModal'
import type { UseGhosttyImportReturn } from './useGhosttyImport'
import { ManageSessionsSection } from './ManageSessionsSection'
import { TerminalQuickCommandsSection } from './TerminalQuickCommandsSection'
import { getRepoIdFromWorktreeId } from '../../../../shared/worktree-id'

type TerminalPaneProps = {
  settings: GlobalSettings
  updateSettings: (updates: Partial<GlobalSettings>) => void
  systemPrefersDark: boolean
  terminalFontSuggestions: string[]
  scrollbackMode: 'preset' | 'custom'
  setScrollbackMode: (mode: 'preset' | 'custom') => void
  /** Ghostty import modal state + handlers. Lifted to the Settings shell so
   *  the section header can render the trigger button as a headerAction
   *  instead of taking its own row inside the settings list. */
  ghostty: UseGhosttyImportReturn
  /** Whether WSL is installed on this Windows machine. */
  wslAvailable?: boolean
  /** Whether PowerShell 7+ (pwsh.exe) is installed on this Windows machine. */
  pwshAvailable?: boolean
}

export function TerminalPane({
  settings,
  updateSettings,
  systemPrefersDark,
  terminalFontSuggestions,
  scrollbackMode,
  setScrollbackMode,
  ghostty,
  wslAvailable,
  pwshAvailable
}: TerminalPaneProps): React.JSX.Element {
  const { t } = useTranslation()
  const searchQuery = useAppStore((state) => state.settingsSearchQuery)
  const repos = useAppStore((state) => state.repos)
  const activeWorktreeId = useAppStore((state) => state.activeWorktreeId)
  const activeRepoId = activeWorktreeId ? getRepoIdFromWorktreeId(activeWorktreeId) : null
  const isWindows = isWindowsUserAgent()
  const isMac = isMacUserAgent()
  const [themeSearchDark, setThemeSearchDark] = useState('')
  const [themeSearchLight, setThemeSearchLight] = useState('')

  const darkPreviewAppearance = resolveEffectiveTerminalAppearance(
    { ...settings, theme: 'dark' },
    systemPrefersDark
  )
  const lightPreviewAppearance = resolveEffectiveTerminalAppearance(
    { ...settings, theme: 'light' },
    systemPrefersDark
  )
  const paneStyleOptions = resolvePaneStyleOptions(settings)
  const detectedLayout = useDetectedOptionAsAlt()
  const autoDetectedDefault = detectedCategoryToDefault(detectedLayout)
  const detectedLayoutLabel =
    detectedLayout === 'us'
      ? t('settings.terminal.advanced.optionAsAltDetectedUs')
      : detectedLayout === 'non-us'
        ? t('settings.terminal.advanced.optionAsAltDetectedNonUs')
        : t('settings.terminal.advanced.optionAsAltDetectedUnknown')
  const scrollbackMb = Math.max(1, Math.round(settings.terminalScrollbackBytes / 1_000_000))
  const isPreset = SCROLLBACK_PRESETS_MB.includes(
    scrollbackMb as (typeof SCROLLBACK_PRESETS_MB)[number]
  )
  const scrollbackToggleValue =
    scrollbackMode === 'custom' ? 'custom' : isPreset ? `${scrollbackMb}` : 'custom'
  const windowsShell = settings.terminalWindowsShell ?? 'powershell.exe'
  const powerShellImplementation = settings.terminalWindowsPowerShellImplementation ?? 'auto'
  const showWindowsPowerShellImplementation = isWindows && windowsShell === 'powershell.exe'
  const pickFloatingTerminalDirectory = async (): Promise<void> => {
    const path = await window.api.repos.pickFolder()
    if (!path) {
      return
    }
    updateSettings({ floatingTerminalCwd: path })
  }

  const visibleSections = [
    isWindows && matchesSettingsSearch(searchQuery, TERMINAL_WINDOWS_SHELL_SEARCH_ENTRY) ? (
      <section key="windows-shell" className="space-y-4">
        <SearchableSetting
          title={t('settings.terminal.windowsShell.title')}
          description={t('settings.terminal.windowsShell.description')}
          keywords={[
            'terminal',
            'windows',
            'shell',
            'powershell',
            'cmd',
            'command prompt',
            'default'
          ]}
          className="space-y-2"
        >
          <Label>{t('settings.terminal.windowsShell.title')}</Label>
          <div className="flex w-fit gap-1 rounded-md border border-border/50 p-1">
            {[
              { label: t('settings.terminal.windowsShell.powershell'), value: 'powershell.exe' },
              { label: t('settings.terminal.windowsShell.commandPrompt'), value: 'cmd.exe' },
              ...(wslAvailable
                ? [{ label: t('settings.terminal.windowsShell.wsl'), value: 'wsl.exe' }]
                : [])
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => updateSettings({ terminalWindowsShell: value })}
                className={`rounded-sm px-3 py-1 text-sm transition-colors ${
                  windowsShell === value
                    ? 'bg-accent font-medium text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {t('settings.terminal.windowsShell.effectDescription')}
          </p>
        </SearchableSetting>
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, TERMINAL_FLOATING_SEARCH_ENTRIES) ? (
      <section key="floating-terminal" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.terminal.floating.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.terminal.floating.description')}
          </p>
        </div>

        <SearchableSetting
          title={t('settings.terminal.floating.title')}
          description={t('settings.terminal.floating.description')}
          keywords={['terminal', 'global', 'floating', 'quick terminal', 'launch directory']}
          className="space-y-3"
        >
          <div className="flex items-center justify-between gap-4 px-1 py-2">
            <div className="space-y-0.5">
              <Label>{t('settings.terminal.floating.enable')}</Label>
              <p className="text-xs text-muted-foreground">
                {t('settings.terminal.floating.enableDescription')}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.floatingTerminalEnabled}
              onClick={() =>
                updateSettings({
                  floatingTerminalEnabled: !settings.floatingTerminalEnabled
                })
              }
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
                settings.floatingTerminalEnabled ? 'bg-foreground' : 'bg-muted-foreground/30'
              }`}
            >
              <span
                className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
                  settings.floatingTerminalEnabled ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="space-y-2">
            <Label>{t('settings.terminal.floating.defaultDirectory')}</Label>
            <div className="flex max-w-xl gap-2">
              <Input
                value={settings.floatingTerminalCwd || '~'}
                onChange={(event) =>
                  updateSettings({
                    floatingTerminalCwd: event.target.value
                  })
                }
                placeholder="~"
                className="min-w-0 flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={t('settings.terminal.floating.chooseDirectoryAriaLabel')}
                onClick={() => void pickFloatingTerminalDirectory()}
              >
                <FolderOpen className="size-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {t('settings.terminal.floating.defaultDirectoryDescription')}
            </p>
          </div>

          <div className="space-y-2">
            <Label>{t('settings.terminal.floating.toggleLocation')}</Label>
            <ToggleGroup
              type="single"
              value={settings.floatingTerminalTriggerLocation ?? 'floating-button'}
              onValueChange={(value) => {
                if (!value) {
                  return
                }
                updateSettings({
                  floatingTerminalTriggerLocation: value as FloatingTerminalTriggerLocation
                })
              }}
              className="justify-start"
            >
              <ToggleGroupItem value="floating-button">
                {t('settings.terminal.floating.floatingButton')}
              </ToggleGroupItem>
              <ToggleGroupItem value="status-bar">
                {t('settings.terminal.floating.statusBar')}
              </ToggleGroupItem>
            </ToggleGroup>
            <p className="text-xs text-muted-foreground">
              {t('settings.terminal.floating.keyboardShortcutHint')}
            </p>
          </div>
        </SearchableSetting>
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, TERMINAL_QUICK_COMMANDS_SEARCH_ENTRIES) ? (
      <section key="quick-commands" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.terminal.quickCommands.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.terminal.quickCommands.description')}
          </p>
        </div>

        <SearchableSetting
          title={t('settings.terminal.quickCommands.title')}
          description={t('settings.terminal.quickCommands.description')}
          keywords={[
            'terminal',
            'command',
            'snippet',
            'quick command',
            'send',
            'context menu',
            'repo',
            'repository'
          ]}
          className="space-y-3"
        >
          <TerminalQuickCommandsSection
            commands={settings.terminalQuickCommands ?? []}
            repos={repos}
            activeRepoId={activeRepoId}
            onChange={(terminalQuickCommands) => updateSettings({ terminalQuickCommands })}
          />
        </SearchableSetting>
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, TERMINAL_TYPOGRAPHY_SEARCH_ENTRIES) ? (
      <section key="typography" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.terminal.typography.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.terminal.typography.description')}
          </p>
        </div>

        <SearchableSetting
          title={t('settings.terminal.typography.fontSize')}
          description={t('settings.terminal.typography.description')}
          keywords={['terminal', 'typography', 'text size']}
          className="space-y-2"
        >
          <Label>{t('settings.terminal.typography.fontSize')}</Label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => {
                const next = Math.max(10, settings.terminalFontSize - 1)
                updateSettings({ terminalFontSize: next })
              }}
              disabled={settings.terminalFontSize <= 10}
            >
              <Minus className="size-3" />
            </Button>
            <Input
              type="number"
              min={10}
              max={24}
              value={settings.terminalFontSize}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10)
                if (!Number.isNaN(value) && value >= 10 && value <= 24) {
                  updateSettings({ terminalFontSize: value })
                }
              }}
              className="w-16 text-center tabular-nums"
            />
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => {
                const next = Math.min(24, settings.terminalFontSize + 1)
                updateSettings({ terminalFontSize: next })
              }}
              disabled={settings.terminalFontSize >= 24}
            >
              <Plus className="size-3" />
            </Button>
            <span className="text-xs text-muted-foreground">px</span>
          </div>
        </SearchableSetting>

        <SearchableSetting
          title={t('settings.terminal.typography.fontFamily')}
          description={t('settings.terminal.typography.description')}
          keywords={['terminal', 'typography', 'font']}
          className="space-y-2"
        >
          <Label>{t('settings.terminal.typography.fontFamily')}</Label>
          <FontAutocomplete
            value={settings.terminalFontFamily}
            suggestions={terminalFontSuggestions}
            onChange={(value) => updateSettings({ terminalFontFamily: value })}
          />
        </SearchableSetting>

        <SearchableSetting
          title={t('settings.terminal.typography.fontWeight')}
          description={t('settings.terminal.typography.description')}
          keywords={['terminal', 'typography', 'weight']}
        >
          <NumberField
            label={t('settings.terminal.typography.fontWeight')}
            description={t('settings.terminal.typography.fontWeightDescription')}
            value={normalizeTerminalFontWeight(settings.terminalFontWeight)}
            defaultValue={DEFAULT_TERMINAL_FONT_WEIGHT}
            min={TERMINAL_FONT_WEIGHT_MIN}
            max={TERMINAL_FONT_WEIGHT_MAX}
            step={TERMINAL_FONT_WEIGHT_STEP}
            suffix="100 to 900"
            onChange={(value) =>
              updateSettings({
                terminalFontWeight: normalizeTerminalFontWeight(value)
              })
            }
          />
        </SearchableSetting>

        <SearchableSetting
          title={t('settings.terminal.typography.lineHeight')}
          description={t('settings.terminal.typography.description')}
          keywords={['terminal', 'typography', 'line height', 'spacing']}
        >
          <NumberField
            label={t('settings.terminal.typography.lineHeight')}
            description={t('settings.terminal.typography.lineHeightDescription')}
            value={settings.terminalLineHeight}
            defaultValue={1}
            min={1}
            max={3}
            step={0.1}
            suffix="1 to 3"
            onChange={(value) =>
              updateSettings({
                terminalLineHeight: clampNumber(value, 1, 3)
              })
            }
          />
        </SearchableSetting>

        <SearchableSetting
          title={t('settings.terminal.rendering.fontLigaturesLabel')}
          description={t('settings.terminal.rendering.fontLigaturesDescription')}
          keywords={[
            'terminal',
            'typography',
            'ligatures',
            'ligature',
            'fira code',
            'jetbrains mono',
            'cascadia code',
            'iosevka',
            'calt',
            'font features'
          ]}
          className="space-y-2"
        >
          <Label>{t('settings.terminal.rendering.fontLigaturesLabel')}</Label>
          <div className="flex w-fit gap-1 rounded-md border border-border/50 p-1">
            {(['auto', 'on', 'off'] as const).map((option) => (
              <button
                key={option}
                onClick={() => updateSettings({ terminalLigatures: option })}
                className={`rounded-sm px-3 py-1 text-sm capitalize transition-colors ${
                  (settings.terminalLigatures ?? 'auto') === option
                    ? 'bg-accent font-medium text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {option === 'auto'
                  ? t('settings.terminal.rendering.fontLigaturesAuto')
                  : option === 'on'
                    ? t('settings.terminal.rendering.fontLigaturesOn')
                    : t('settings.terminal.rendering.fontLigaturesOff')}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {settings.terminalLigatures === 'on'
              ? t('settings.terminal.rendering.ligaturesOnAlways')
              : settings.terminalLigatures === 'off'
                ? t('settings.terminal.rendering.ligaturesOffAlways')
                : fontFamilyHasKnownLigatures(settings.terminalFontFamily)
                  ? t('settings.terminal.rendering.ligaturesAutoEnabled', {
                      fontFamily: settings.terminalFontFamily
                    })
                  : t('settings.terminal.rendering.ligaturesAutoDisabled', {
                      fontFamily: settings.terminalFontFamily || 'the current font'
                    })}
          </p>
          {/* Why: surface the resolved state explicitly so the "Auto" label
              isn't ambiguous when a user is staring at it. */}
          <p className="sr-only" aria-live="polite">
            {resolveTerminalLigaturesEnabled(
              settings.terminalLigatures,
              settings.terminalFontFamily
            )
              ? t('settings.terminal.rendering.ligaturesAriaEnabled')
              : t('settings.terminal.rendering.ligaturesAriaDisabled')}
          </p>
        </SearchableSetting>
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, TERMINAL_RENDERING_SEARCH_ENTRIES) ? (
      <section key="rendering" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.terminal.rendering.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.terminal.rendering.description')}
          </p>
        </div>

        <SearchableSetting
          title={t('settings.terminal.rendering.gpuAcceleration')}
          description={t('settings.terminal.rendering.gpuAccelerationDescription')}
          keywords={[
            'terminal',
            'gpu',
            'acceleration',
            'webgl',
            'renderer',
            'rendering',
            'graphics',
            'linux',
            'vscode'
          ]}
          className="space-y-2"
        >
          <Label>{t('settings.terminal.rendering.gpuAcceleration')}</Label>
          <div className="flex w-fit gap-1 rounded-md border border-border/50 p-1">
            {(['auto', 'on', 'off'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => updateSettings({ terminalGpuAcceleration: option })}
                className={`rounded-sm px-3 py-1 text-sm capitalize transition-colors ${
                  (settings.terminalGpuAcceleration ?? 'auto') === option
                    ? 'bg-accent font-medium text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {option === 'auto'
                  ? t('settings.terminal.rendering.fontLigaturesAuto')
                  : option === 'on'
                    ? t('settings.terminal.rendering.fontLigaturesOn')
                    : t('settings.terminal.rendering.fontLigaturesOff')}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {settings.terminalGpuAcceleration === 'off'
              ? t('settings.terminal.rendering.gpuOff')
              : settings.terminalGpuAcceleration === 'on'
                ? t('settings.terminal.rendering.gpuOn')
                : t('settings.terminal.rendering.gpuAuto')}
          </p>
        </SearchableSetting>
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, TERMINAL_CURSOR_SEARCH_ENTRIES) ? (
      <section key="cursor" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.terminal.cursor.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.terminal.cursor.description')}
          </p>
        </div>

        <div className="space-y-4">
          <SearchableSetting
            title={t('settings.terminal.cursor.shape')}
            description={t('settings.terminal.cursor.description')}
            keywords={['terminal', 'cursor', 'bar', 'block', 'underline']}
            className="space-y-2"
          >
            <Label>{t('settings.terminal.cursor.shapeLabel')}</Label>
            <div className="flex w-fit gap-1 rounded-md border border-border/50 p-1">
              {(['bar', 'block', 'underline'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => updateSettings({ terminalCursorStyle: option })}
                  className={`rounded-sm px-3 py-1 text-sm capitalize transition-colors ${
                    settings.terminalCursorStyle === option
                      ? 'bg-accent font-medium text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {option === 'bar'
                    ? t('settings.terminal.cursor.shapeBar')
                    : option === 'block'
                      ? t('settings.terminal.cursor.shapeBlock')
                      : t('settings.terminal.cursor.shapeUnderline')}
                </button>
              ))}
            </div>
          </SearchableSetting>

          <SearchableSetting
            title={t('settings.terminal.cursor.blinkingLabel')}
            description={t('settings.terminal.cursor.blinkingDescription')}
            keywords={['terminal', 'cursor', 'blink']}
            className="flex items-center justify-between gap-4 px-1 py-2"
          >
            <div className="space-y-0.5">
              <Label>{t('settings.terminal.cursor.blinkingLabel')}</Label>
              <p className="text-xs text-muted-foreground">
                {t('settings.terminal.cursor.blinkingDescription')}
              </p>
            </div>
            <button
              role="switch"
              aria-checked={settings.terminalCursorBlink}
              onClick={() =>
                updateSettings({
                  terminalCursorBlink: !settings.terminalCursorBlink
                })
              }
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
                settings.terminalCursorBlink ? 'bg-foreground' : 'bg-muted-foreground/30'
              }`}
            >
              <span
                className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
                  settings.terminalCursorBlink ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
          </SearchableSetting>

          <SearchableSetting
            title={t('settings.terminal.cursor.opacityLabel')}
            description={t('settings.terminal.cursor.opacityDescription')}
            keywords={['terminal', 'cursor', 'opacity', 'transparency']}
          >
            <NumberField
              label={t('settings.terminal.cursor.opacityLabel')}
              description={t('settings.terminal.cursor.opacityDescription')}
              value={settings.terminalCursorOpacity ?? 1}
              defaultValue={1}
              min={0}
              max={1}
              step={0.05}
              suffix="0 to 1"
              onChange={(value) =>
                updateSettings({
                  terminalCursorOpacity: clampNumber(value, 0, 1)
                })
              }
            />
          </SearchableSetting>
        </div>
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, TERMINAL_PANE_STYLE_SEARCH_ENTRIES) ||
    (isWindows &&
      matchesSettingsSearch(searchQuery, TERMINAL_RIGHT_CLICK_TO_PASTE_SEARCH_ENTRY)) ? (
      <section key="pane-styling" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.terminal.paneStyling.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.terminal.paneStyling.description')}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <SearchableSetting
            title={t('settings.terminal.paneStyling.inactivePaneOpacityLabel')}
            description={t('settings.terminal.paneStyling.inactivePaneOpacityDescription')}
            keywords={['pane', 'opacity', 'dimming']}
          >
            <NumberField
              label={t('settings.terminal.paneStyling.inactivePaneOpacityLabel')}
              description={t('settings.terminal.paneStyling.inactivePaneOpacityDescription')}
              value={paneStyleOptions.inactivePaneOpacity}
              defaultValue={0.8}
              min={0}
              max={1}
              step={0.05}
              suffix="0 to 1"
              onChange={(value) =>
                updateSettings({
                  terminalInactivePaneOpacity: clampNumber(value, 0, 1)
                })
              }
            />
          </SearchableSetting>
          <SearchableSetting
            title={t('settings.terminal.paneStyling.dividerThicknessLabel')}
            description={t('settings.terminal.paneStyling.dividerThicknessDescription')}
            keywords={['pane', 'divider', 'thickness']}
          >
            <NumberField
              label={t('settings.terminal.paneStyling.dividerThicknessLabel')}
              description={t('settings.terminal.paneStyling.dividerThicknessDescription')}
              value={paneStyleOptions.dividerThicknessPx}
              defaultValue={1}
              min={1}
              max={32}
              step={1}
              suffix="px"
              onChange={(value) =>
                updateSettings({
                  terminalDividerThicknessPx: clampNumber(value, 1, 32)
                })
              }
            />
          </SearchableSetting>
        </div>

        {/* Why: the Windows-only right-click toggle lives in this section, so the
            section must also match that search term or settings search would hide
            the control even though it is present. */}
        {isWindows &&
          matchesSettingsSearch(searchQuery, TERMINAL_RIGHT_CLICK_TO_PASTE_SEARCH_ENTRY) && (
            <SearchableSetting
              title={t('settings.terminal.paneStyling.rightClickToPasteLabel')}
              description={t('settings.terminal.paneStyling.rightClickToPasteDescription')}
              keywords={['terminal', 'windows', 'right click', 'paste', 'context menu']}
              className="flex items-center justify-between gap-4 px-1 py-2"
            >
              <div className="space-y-0.5">
                <Label>{t('settings.terminal.paneStyling.rightClickToPasteLabel')}</Label>
                <p className="text-xs text-muted-foreground">
                  {t('settings.terminal.paneStyling.rightClickToPasteDescription')}
                </p>
              </div>
              <button
                role="switch"
                aria-checked={settings.terminalRightClickToPaste}
                onClick={() =>
                  updateSettings({
                    terminalRightClickToPaste: !settings.terminalRightClickToPaste
                  })
                }
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
                  settings.terminalRightClickToPaste ? 'bg-foreground' : 'bg-muted-foreground/30'
                }`}
              >
                <span
                  className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
                    settings.terminalRightClickToPaste ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </SearchableSetting>
          )}

        <SearchableSetting
          title={t('settings.terminal.advanced.focusFollowsMouseLabel')}
          description={t('settings.terminal.advanced.focusFollowsMouseDescription')}
          keywords={['focus', 'follows', 'mouse', 'hover', 'pane', 'ghostty', 'active']}
          className="flex items-center justify-between gap-4 px-1 py-2"
        >
          <div className="space-y-0.5">
            <Label>{t('settings.terminal.advanced.focusFollowsMouseLabel')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.terminal.advanced.focusFollowsMouseDescription')}
            </p>
          </div>
          <button
            role="switch"
            aria-checked={settings.terminalFocusFollowsMouse}
            onClick={() =>
              updateSettings({
                terminalFocusFollowsMouse: !settings.terminalFocusFollowsMouse
              })
            }
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
              settings.terminalFocusFollowsMouse ? 'bg-foreground' : 'bg-muted-foreground/30'
            }`}
          >
            <span
              className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
                settings.terminalFocusFollowsMouse ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </button>
        </SearchableSetting>

        <SearchableSetting
          title={t('settings.terminal.advanced.copyOnSelectLabel')}
          description={t('settings.terminal.advanced.copyOnSelectDescription')}
          keywords={[
            'clipboard',
            'copy',
            'select',
            'selection',
            'auto',
            'automatic',
            'x11',
            'linux',
            'gnome',
            'paste'
          ]}
          className="flex items-center justify-between gap-4 px-1 py-2"
        >
          <div className="space-y-0.5">
            <Label>{t('settings.terminal.advanced.copyOnSelectLabel')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.terminal.advanced.copyOnSelectDescription')}
            </p>
          </div>
          <button
            role="switch"
            aria-checked={settings.terminalClipboardOnSelect}
            onClick={() =>
              updateSettings({
                terminalClipboardOnSelect: !settings.terminalClipboardOnSelect
              })
            }
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
              settings.terminalClipboardOnSelect ? 'bg-foreground' : 'bg-muted-foreground/30'
            }`}
          >
            <span
              className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
                settings.terminalClipboardOnSelect ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </button>
        </SearchableSetting>

        <SearchableSetting
          title={t('settings.terminal.advanced.osc52Label')}
          description={t('settings.terminal.advanced.osc52Description')}
          keywords={[
            'osc 52',
            'osc52',
            'clipboard',
            'tmux',
            'neovim',
            'nvim',
            'fzf',
            'ssh',
            'remote',
            'copy',
            'paste'
          ]}
          className="flex items-center justify-between gap-4 px-1 py-2"
        >
          <div className="space-y-0.5">
            <Label>{t('settings.terminal.advanced.osc52Label')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.terminal.advanced.osc52ShortDescription')}
            </p>
          </div>
          <button
            role="switch"
            aria-checked={settings.terminalAllowOsc52Clipboard}
            onClick={() =>
              updateSettings({
                terminalAllowOsc52Clipboard: !settings.terminalAllowOsc52Clipboard
              })
            }
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
              settings.terminalAllowOsc52Clipboard ? 'bg-foreground' : 'bg-muted-foreground/30'
            }`}
          >
            <span
              className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
                settings.terminalAllowOsc52Clipboard ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </button>
        </SearchableSetting>
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, TERMINAL_WINDOW_SEARCH_ENTRIES) ? (
      <TerminalWindowSection key="window" settings={settings} updateSettings={updateSettings} />
    ) : null,
    matchesSettingsSearch(searchQuery, TERMINAL_DARK_THEME_SEARCH_ENTRIES) ? (
      <DarkTerminalThemeSection
        key="dark-theme"
        settings={settings}
        systemPrefersDark={systemPrefersDark}
        themeSearchDark={themeSearchDark}
        setThemeSearchDark={setThemeSearchDark}
        updateSettings={updateSettings}
        previewProps={paneStyleOptions}
        darkPreviewAppearance={darkPreviewAppearance}
      />
    ) : null,
    matchesSettingsSearch(searchQuery, TERMINAL_LIGHT_THEME_SEARCH_ENTRIES) ? (
      <LightTerminalThemeSection
        key="light-theme"
        settings={settings}
        themeSearchLight={themeSearchLight}
        setThemeSearchLight={setThemeSearchLight}
        updateSettings={updateSettings}
        previewProps={paneStyleOptions}
        lightPreviewAppearance={lightPreviewAppearance}
      />
    ) : null,
    matchesSettingsSearch(searchQuery, TERMINAL_SETUP_SCRIPT_SEARCH_ENTRIES) ? (
      <section key="setup-script" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.terminal.setupScript.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.terminal.setupScript.description')}
          </p>
        </div>

        <SearchableSetting
          title={t('settings.terminal.setupScript.setupScriptLocationLabel')}
          description={t('settings.terminal.setupScript.setupScriptLocationDescription')}
          keywords={[
            'setup',
            'script',
            'workspace',
            'split',
            'horizontal',
            'vertical',
            'tab',
            'new',
            'location',
            'launch'
          ]}
          className="space-y-2"
        >
          <Label>{t('settings.terminal.setupScript.setupScriptLocationLabel')}</Label>
          <ToggleGroup
            type="single"
            value={settings.setupScriptLaunchMode}
            onValueChange={(value) => {
              if (!value) {
                return
              }
              updateSettings({
                setupScriptLaunchMode: value as SetupScriptLaunchMode
              })
            }}
            variant="outline"
            size="sm"
            className="h-8 flex-wrap"
          >
            <ToggleGroupItem
              value="new-tab"
              className="h-8 px-3 text-xs"
              aria-label={t('settings.terminal.setupScript.runInNewTabAriaLabel')}
            >
              {t('settings.terminal.setupScript.newTab')}
            </ToggleGroupItem>
            <ToggleGroupItem
              value="split-vertical"
              className="h-8 px-3 text-xs"
              aria-label={t('settings.terminal.setupScript.splitVerticallyAriaLabel')}
            >
              {t('settings.terminal.setupScript.splitVertical')}
            </ToggleGroupItem>
            <ToggleGroupItem
              value="split-horizontal"
              className="h-8 px-3 text-xs"
              aria-label={t('settings.terminal.setupScript.splitHorizontallyAriaLabel')}
            >
              {t('settings.terminal.setupScript.splitHorizontal')}
            </ToggleGroupItem>
          </ToggleGroup>
          <p className="text-xs text-muted-foreground">{t('settings.terminal.setupScript.hint')}</p>
        </SearchableSetting>
      </section>
    ) : null,
    matchesSettingsSearch(searchQuery, MANAGE_SESSIONS_SEARCH_ENTRIES) ? (
      <ManageSessionsSection key="manage-sessions" />
    ) : null,
    matchesSettingsSearch(searchQuery, TERMINAL_ADVANCED_SEARCH_ENTRIES) ||
    (showWindowsPowerShellImplementation &&
      matchesSettingsSearch(
        searchQuery,
        TERMINAL_WINDOWS_POWERSHELL_IMPLEMENTATION_SEARCH_ENTRY
      )) ||
    (isMac && matchesSettingsSearch(searchQuery, TERMINAL_MAC_OPTION_SEARCH_ENTRIES)) ? (
      <section key="advanced" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.terminal.advanced.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.terminal.advanced.description')}
          </p>
        </div>

        <SearchableSetting
          title={t('settings.terminal.advanced.scrollbackSizeLabel')}
          description={t('settings.terminal.advanced.scrollbackSizeDescription')}
          keywords={['terminal', 'scrollback', 'buffer', 'memory']}
          className="space-y-3"
        >
          <Label>{t('settings.terminal.advanced.scrollbackSizeLabel')}</Label>
          <ToggleGroup
            type="single"
            value={scrollbackToggleValue}
            onValueChange={(value) => {
              if (!value) {
                return
              }
              if (value === 'custom') {
                setScrollbackMode('custom')
                return
              }

              setScrollbackMode('preset')
              updateSettings({
                terminalScrollbackBytes: Number(value) * 1_000_000
              })
            }}
            variant="outline"
            size="sm"
            className="h-8 flex-wrap"
          >
            {SCROLLBACK_PRESETS_MB.map((preset) => (
              <ToggleGroupItem
                key={preset}
                value={`${preset}`}
                className="h-8 px-3 text-xs"
                aria-label={t('settings.terminal.advanced.scrollbackPresetAriaLabel', { preset })}
              >
                {preset} MB
              </ToggleGroupItem>
            ))}
            <ToggleGroupItem
              value="custom"
              className="h-8 px-3 text-xs"
              aria-label={t('settings.terminal.advanced.scrollbackCustom')}
            >
              {t('settings.terminal.advanced.scrollbackCustom')}
            </ToggleGroupItem>
          </ToggleGroup>

          {scrollbackMode === 'custom' ? (
            <NumberField
              label={t('settings.terminal.advanced.customScrollbackLabel')}
              description={t('settings.terminal.advanced.customScrollbackDescription')}
              value={scrollbackMb}
              defaultValue={10}
              min={1}
              max={256}
              step={1}
              suffix="MB"
              onChange={(value) =>
                updateSettings({
                  terminalScrollbackBytes: clampNumber(value, 1, 256) * 1_000_000
                })
              }
            />
          ) : null}
        </SearchableSetting>

        <SearchableSetting
          title={t('settings.terminal.advanced.wordSeparatorsLabel')}
          description={t('settings.terminal.advanced.wordSeparatorsDescription')}
          keywords={['word', 'separator', 'boundary', 'double-click', 'selection']}
          className="space-y-2"
        >
          <Label>{t('settings.terminal.advanced.wordSeparatorsLabel')}</Label>
          <Input
            value={settings.terminalWordSeparator ?? ''}
            onChange={(e) => {
              const value = e.target.value
              updateSettings({ terminalWordSeparator: value || undefined })
            }}
            placeholder={t('settings.terminal.advanced.wordSeparatorsPlaceholder')}
            className="max-w-sm"
          />
          <p className="text-xs text-muted-foreground">
            {t('settings.terminal.advanced.wordSeparatorsDescription')}
          </p>
        </SearchableSetting>
        {showWindowsPowerShellImplementation &&
        matchesSettingsSearch(
          searchQuery,
          TERMINAL_WINDOWS_POWERSHELL_IMPLEMENTATION_SEARCH_ENTRY
        ) ? (
          <SearchableSetting
            title={t('settings.terminal.advanced.powershellVersionLabel')}
            description={t('settings.terminal.advanced.powershellVersionDescription')}
            keywords={[
              'terminal',
              'windows',
              'powershell',
              'pwsh',
              'powershell 7',
              'windows powershell',
              'version',
              'advanced'
            ]}
            className="space-y-2"
          >
            <Label>{t('settings.terminal.advanced.powershellVersionLabel')}</Label>
            <div className="flex w-fit gap-1 rounded-md border border-border/50 p-1">
              {[
                { label: t('settings.terminal.advanced.powershellAuto'), value: 'auto' },
                {
                  label: t('settings.terminal.advanced.windowsPowershell'),
                  value: 'powershell.exe'
                },
                { label: 'PowerShell 7+', value: 'pwsh.exe', disabled: !pwshAvailable }
              ].map(({ label, value, disabled }) => (
                <button
                  key={value}
                  onClick={() => {
                    if (disabled) {
                      return
                    }
                    updateSettings({
                      terminalWindowsPowerShellImplementation: value as
                        | 'auto'
                        | 'powershell.exe'
                        | 'pwsh.exe'
                    })
                  }}
                  aria-disabled={disabled ? 'true' : undefined}
                  className={`rounded-sm px-3 py-1 text-sm transition-colors ${
                    powerShellImplementation === value
                      ? 'bg-accent font-medium text-accent-foreground'
                      : disabled
                        ? 'cursor-not-allowed text-muted-foreground/50'
                        : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {!pwshAvailable ? (
              <p className="text-xs text-muted-foreground">
                {t('settings.terminal.advanced.pwshNotAvailable')}{' '}
                <a
                  href="https://github.com/PowerShell/PowerShell/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  {t('settings.terminal.advanced.pwshDownload')}
                </a>
                .
              </p>
            ) : null}
          </SearchableSetting>
        ) : null}
        {isMac ? (
          <SearchableSetting
            title={t('settings.terminal.advanced.optionAsAltLabel')}
            description={t('settings.terminal.advanced.optionAsAltDescription')}
            keywords={[
              'terminal',
              'option',
              'alt',
              'key',
              'meta',
              'compose',
              'mac',
              'macos',
              'keyboard',
              'german',
              'international',
              'readline',
              'ghostty'
            ]}
            className="space-y-2"
          >
            <Label>{t('settings.terminal.advanced.optionAsAltLabel')}</Label>
            <div className="flex w-fit gap-1 rounded-md border border-border/50 p-1">
              {(['auto', 'true', 'left', 'right', 'false'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => updateSettings({ terminalMacOptionAsAlt: option })}
                  className={`rounded-sm px-3 py-1 text-sm transition-colors ${
                    settings.terminalMacOptionAsAlt === option
                      ? 'bg-accent font-medium text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {option === 'auto'
                    ? t('settings.terminal.advanced.optionAsAltAuto')
                    : option === 'false'
                      ? t('settings.terminal.advanced.optionAsAltNone')
                      : option === 'true'
                        ? t('settings.terminal.advanced.optionAsAltBoth')
                        : option === 'left'
                          ? t('settings.terminal.advanced.optionAsAltLeft')
                          : t('settings.terminal.advanced.optionAsAltRight')}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {settings.terminalMacOptionAsAlt === 'auto'
                ? autoDetectedDefault === 'true'
                  ? t('settings.terminal.advanced.optionAsAltAutoUs', {
                      detected: detectedLayoutLabel
                    })
                  : t('settings.terminal.advanced.optionAsAltAutoNonUs', {
                      detected: detectedLayoutLabel
                    })
                : settings.terminalMacOptionAsAlt === 'false'
                  ? t('settings.terminal.advanced.optionAsAltFalse')
                  : settings.terminalMacOptionAsAlt === 'true'
                    ? t('settings.terminal.advanced.optionAsAltTrue')
                    : t('settings.terminal.advanced.optionAsAltSide', {
                        side: settings.terminalMacOptionAsAlt
                      })}
            </p>
          </SearchableSetting>
        ) : null}
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
      <GhosttyImportModal
        open={ghostty.open}
        onOpenChange={ghostty.handleOpenChange}
        preview={ghostty.preview}
        loading={ghostty.loading}
        onApply={ghostty.handleApply}
        applied={ghostty.applied}
        applyError={ghostty.applyError}
      />
    </div>
  )
}
