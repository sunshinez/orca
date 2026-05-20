import { useTranslation } from 'react-i18next'
import type { Dispatch, SetStateAction } from 'react'
import type { GlobalSettings } from '../../../../shared/types'
import type { EffectiveTerminalAppearance } from '@/lib/terminal-theme'
import { ColorField, ThemePicker } from './SettingsFormControls'
import { SearchableSetting } from './SearchableSetting'
import { TerminalThemePreview } from './TerminalThemePreview'

type ThemePreviewProps = {
  dividerThicknessPx: number
  inactivePaneOpacity: number
  activePaneOpacity: number
}

type DarkTerminalThemeSectionProps = {
  settings: GlobalSettings
  systemPrefersDark: boolean
  themeSearchDark: string
  setThemeSearchDark: Dispatch<SetStateAction<string>>
  updateSettings: (updates: Partial<GlobalSettings>) => void
  previewProps: ThemePreviewProps
  darkPreviewAppearance: EffectiveTerminalAppearance
}

type LightTerminalThemeSectionProps = {
  settings: GlobalSettings
  themeSearchLight: string
  setThemeSearchLight: Dispatch<SetStateAction<string>>
  updateSettings: (updates: Partial<GlobalSettings>) => void
  previewProps: ThemePreviewProps
  lightPreviewAppearance: EffectiveTerminalAppearance
}

export function DarkTerminalThemeSection({
  settings,
  systemPrefersDark,
  themeSearchDark,
  setThemeSearchDark,
  updateSettings,
  previewProps,
  darkPreviewAppearance
}: DarkTerminalThemeSectionProps): React.JSX.Element {
  const { t } = useTranslation()
  const modeLabel = systemPrefersDark
    ? t('settings.terminal.darkTheme.modeDark')
    : t('settings.terminal.darkTheme.modeLight')

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.terminal.darkTheme.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.terminal.darkTheme.description')}
          </p>
        </div>

        <SearchableSetting
          title={t('settings.terminal.darkTheme.themeLabel')}
          description={t('settings.terminal.darkTheme.themeDescription')}
          keywords={['terminal', 'theme', 'dark', 'preview']}
        >
          <ThemePicker
            label={t('settings.terminal.darkTheme.themeLabel')}
            description={t('settings.terminal.darkTheme.themeDescription')}
            selectedTheme={settings.terminalThemeDark}
            query={themeSearchDark}
            onQueryChange={setThemeSearchDark}
            onSelectTheme={(theme) => updateSettings({ terminalThemeDark: theme })}
          />
        </SearchableSetting>

        <SearchableSetting
          title={t('settings.terminal.darkTheme.dividerColorLabel')}
          description={t('settings.terminal.darkTheme.dividerColorDescription')}
          keywords={['terminal', 'divider', 'dark', 'color']}
        >
          <ColorField
            label={t('settings.terminal.darkTheme.dividerColorLabel')}
            description={t('settings.terminal.darkTheme.dividerColorDescription')}
            value={settings.terminalDividerColorDark}
            fallback="#3f3f46"
            onChange={(value) => updateSettings({ terminalDividerColorDark: value })}
          />
        </SearchableSetting>
      </div>

      <TerminalThemePreview
        title={t('settings.terminal.darkTheme.previewTitle')}
        description={
          settings.theme === 'system'
            ? t('settings.terminal.darkTheme.previewDescriptionSystem', { mode: modeLabel })
            : t('settings.terminal.darkTheme.previewDescriptionFixed', { mode: settings.theme })
        }
        appearance={darkPreviewAppearance}
        dividerThicknessPx={previewProps.dividerThicknessPx}
        inactivePaneOpacity={previewProps.inactivePaneOpacity}
        activePaneOpacity={previewProps.activePaneOpacity}
      />
    </section>
  )
}

export function LightTerminalThemeSection({
  settings,
  themeSearchLight,
  setThemeSearchLight,
  updateSettings,
  previewProps,
  lightPreviewAppearance
}: LightTerminalThemeSectionProps): React.JSX.Element {
  const { t } = useTranslation()

  return (
    <section className="space-y-4">
      <SearchableSetting
        title={t('settings.terminal.lightTheme.useSeparateTitle')}
        description={t('settings.terminal.lightTheme.useSeparateDescription')}
        keywords={['terminal', 'light mode', 'theme']}
        className="flex items-center justify-between gap-4 px-1 py-2"
      >
        <div className="space-y-0.5">
          <p className="text-sm font-medium">
            {t('settings.terminal.lightTheme.useSeparateTitle')}
          </p>
          <p className="text-xs text-muted-foreground">
            {t('settings.terminal.lightTheme.useSeparateDescription')}
          </p>
        </div>
        <button
          role="switch"
          aria-checked={settings.terminalUseSeparateLightTheme}
          onClick={() =>
            updateSettings({
              terminalUseSeparateLightTheme: !settings.terminalUseSeparateLightTheme
            })
          }
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
            settings.terminalUseSeparateLightTheme ? 'bg-foreground' : 'bg-muted-foreground/30'
          }`}
        >
          <span
            className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
              settings.terminalUseSeparateLightTheme ? 'translate-x-4' : 'translate-x-0.5'
            }`}
          />
        </button>
      </SearchableSetting>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out ${
          settings.terminalUseSeparateLightTheme
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0">
          <div className="grid gap-6 pt-2 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold">{t('settings.terminal.lightTheme.title')}</h3>
                <p className="text-xs text-muted-foreground">
                  {t('settings.terminal.lightTheme.description')}
                </p>
              </div>

              <SearchableSetting
                title={t('settings.terminal.lightTheme.themeLabel')}
                description={t('settings.terminal.lightTheme.themeDescription')}
                keywords={['terminal', 'theme', 'light', 'preview']}
              >
                <ThemePicker
                  label={t('settings.terminal.lightTheme.themeLabel')}
                  description={t('settings.terminal.lightTheme.themeDescription')}
                  selectedTheme={settings.terminalThemeLight}
                  query={themeSearchLight}
                  onQueryChange={setThemeSearchLight}
                  onSelectTheme={(theme) => updateSettings({ terminalThemeLight: theme })}
                />
              </SearchableSetting>

              <SearchableSetting
                title={t('settings.terminal.lightTheme.dividerColorLabel')}
                description={t('settings.terminal.lightTheme.dividerColorDescription')}
                keywords={['terminal', 'divider', 'light', 'color']}
              >
                <ColorField
                  label={t('settings.terminal.lightTheme.dividerColorLabel')}
                  description={t('settings.terminal.lightTheme.dividerColorDescription')}
                  value={settings.terminalDividerColorLight}
                  fallback="#d4d4d8"
                  onChange={(value) => updateSettings({ terminalDividerColorLight: value })}
                />
              </SearchableSetting>
            </div>

            <TerminalThemePreview
              title={t('settings.terminal.lightTheme.previewTitle')}
              description={t('settings.terminal.lightTheme.previewDescription')}
              appearance={lightPreviewAppearance}
              dividerThicknessPx={previewProps.dividerThicknessPx}
              inactivePaneOpacity={previewProps.inactivePaneOpacity}
              activePaneOpacity={previewProps.activePaneOpacity}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
