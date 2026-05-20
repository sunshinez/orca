import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RotateCw } from 'lucide-react'
import type { GlobalSettings, TerminalColorOverrides } from '../../../../shared/types'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { ColorField, NumberField } from './SettingsFormControls'
import { SearchableSetting } from './SearchableSetting'
import { clampNumber } from '@/lib/terminal-theme'

type TerminalWindowSectionProps = {
  settings: GlobalSettings
  updateSettings: (updates: Partial<GlobalSettings>) => void
}

function getColorOverrideGroups(t: (key: string) => string): {
  label: string
  keys: { key: keyof TerminalColorOverrides; label: string; description: string }[]
}[] {
  return [
    {
      label: t('settings.terminal.window.colorGroupBase'),
      keys: [
        {
          key: 'foreground',
          label: t('settings.terminal.window.colorForeground'),
          description: t('settings.terminal.window.colorForegroundDesc')
        },
        {
          key: 'background',
          label: t('settings.terminal.window.colorBackground'),
          description: t('settings.terminal.window.colorBackgroundDesc')
        },
        {
          key: 'cursor',
          label: t('settings.terminal.window.colorCursor'),
          description: t('settings.terminal.window.colorCursorDesc')
        },
        {
          key: 'cursorAccent',
          label: t('settings.terminal.window.colorCursorText'),
          description: t('settings.terminal.window.colorCursorTextDesc')
        },
        {
          key: 'selectionBackground',
          label: t('settings.terminal.window.colorSelectionBackground'),
          description: t('settings.terminal.window.colorSelectionBackgroundDesc')
        },
        {
          key: 'selectionForeground',
          label: t('settings.terminal.window.colorSelectionForeground'),
          description: t('settings.terminal.window.colorSelectionForegroundDesc')
        },
        {
          key: 'bold',
          label: t('settings.terminal.window.colorBoldText'),
          description: t('settings.terminal.window.colorBoldTextDesc')
        }
      ]
    },
    {
      label: t('settings.terminal.window.colorGroupAnsiNormal'),
      keys: [
        {
          key: 'black',
          label: t('settings.terminal.window.colorBlack'),
          description: t('settings.terminal.window.colorBlackDesc')
        },
        {
          key: 'red',
          label: t('settings.terminal.window.colorRed'),
          description: t('settings.terminal.window.colorRedDesc')
        },
        {
          key: 'green',
          label: t('settings.terminal.window.colorGreen'),
          description: t('settings.terminal.window.colorGreenDesc')
        },
        {
          key: 'yellow',
          label: t('settings.terminal.window.colorYellow'),
          description: t('settings.terminal.window.colorYellowDesc')
        },
        {
          key: 'blue',
          label: t('settings.terminal.window.colorBlue'),
          description: t('settings.terminal.window.colorBlueDesc')
        },
        {
          key: 'magenta',
          label: t('settings.terminal.window.colorMagenta'),
          description: t('settings.terminal.window.colorMagentaDesc')
        },
        {
          key: 'cyan',
          label: t('settings.terminal.window.colorCyan'),
          description: t('settings.terminal.window.colorCyanDesc')
        },
        {
          key: 'white',
          label: t('settings.terminal.window.colorWhite'),
          description: t('settings.terminal.window.colorWhiteDesc')
        }
      ]
    },
    {
      label: t('settings.terminal.window.colorGroupAnsiBright'),
      keys: [
        {
          key: 'brightBlack',
          label: t('settings.terminal.window.colorBrightBlack'),
          description: t('settings.terminal.window.colorBrightBlackDesc')
        },
        {
          key: 'brightRed',
          label: t('settings.terminal.window.colorBrightRed'),
          description: t('settings.terminal.window.colorBrightRedDesc')
        },
        {
          key: 'brightGreen',
          label: t('settings.terminal.window.colorBrightGreen'),
          description: t('settings.terminal.window.colorBrightGreenDesc')
        },
        {
          key: 'brightYellow',
          label: t('settings.terminal.window.colorBrightYellow'),
          description: t('settings.terminal.window.colorBrightYellowDesc')
        },
        {
          key: 'brightBlue',
          label: t('settings.terminal.window.colorBrightBlue'),
          description: t('settings.terminal.window.colorBrightBlueDesc')
        },
        {
          key: 'brightMagenta',
          label: t('settings.terminal.window.colorBrightMagenta'),
          description: t('settings.terminal.window.colorBrightMagentaDesc')
        },
        {
          key: 'brightCyan',
          label: t('settings.terminal.window.colorBrightCyan'),
          description: t('settings.terminal.window.colorBrightCyanDesc')
        },
        {
          key: 'brightWhite',
          label: t('settings.terminal.window.colorBrightWhite'),
          description: t('settings.terminal.window.colorBrightWhiteDesc')
        }
      ]
    }
  ]
}

export function TerminalWindowSection({
  settings,
  updateSettings
}: TerminalWindowSectionProps): React.JSX.Element {
  const { t } = useTranslation()
  const [colorOverridesExpanded, setColorOverridesExpanded] = useState(false)
  // Why: windowBackgroundBlur is only read by createMainWindow() at startup
  // (macOS vibrancy / Windows acrylic both require window creation options),
  // so the UI has to ask the user to restart for the change to take effect.
  // Snapshot the value on first render and compare to the live setting to
  // show a "Restart required" banner only when they differ.
  const blurAtMountRef = useRef<boolean>(settings.windowBackgroundBlur ?? false)
  const blurPendingRestart = (settings.windowBackgroundBlur ?? false) !== blurAtMountRef.current
  const [relaunchingBlur, setRelaunchingBlur] = useState(false)

  // Why: the mount-time snapshot captures local state, not main-process state.
  // If the setting is persisted and read correctly on next boot we never need
  // to re-snapshot, but tests mount the component with arbitrary initial
  // values — keep `blurAtMountRef` honest if the settings load asynchronously
  // and the value arrives after mount.
  useEffect(() => {
    blurAtMountRef.current = settings.windowBackgroundBlur ?? false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRelaunch = async (): Promise<void> => {
    if (relaunchingBlur) {
      return
    }
    setRelaunchingBlur(true)
    try {
      await window.api.app.relaunch()
    } catch {
      setRelaunchingBlur(false)
    }
  }

  const colorOverrideGroups = getColorOverrideGroups(t)

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold">{t('settings.terminal.window.title')}</h3>
        <p className="text-xs text-muted-foreground">{t('settings.terminal.window.description')}</p>
      </div>

      <SearchableSetting
        title={t('settings.terminal.window.backgroundOpacityLabel')}
        description={t('settings.terminal.window.backgroundOpacityDescription')}
        keywords={['opacity', 'transparency', 'background', 'alpha']}
      >
        <NumberField
          label={t('settings.terminal.window.backgroundOpacityLabel')}
          description={t('settings.terminal.window.backgroundOpacityDescriptionFull')}
          value={settings.terminalBackgroundOpacity ?? 1}
          defaultValue={1}
          min={0}
          max={1}
          step={0.05}
          suffix="0 to 1"
          onChange={(value) =>
            updateSettings({ terminalBackgroundOpacity: clampNumber(value, 0, 1) })
          }
        />
      </SearchableSetting>

      <SearchableSetting
        title={t('settings.terminal.window.windowBlurLabel')}
        description={t('settings.terminal.window.windowBlurDescription')}
        keywords={['window', 'blur', 'background', 'transparency', 'vibrancy']}
        className="space-y-3 px-1 py-2"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <Label>{t('settings.terminal.window.windowBlurLabel')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('settings.terminal.window.windowBlurDescription')}
            </p>
          </div>
          <button
            role="switch"
            aria-checked={settings.windowBackgroundBlur ?? false}
            onClick={() => updateSettings({ windowBackgroundBlur: !settings.windowBackgroundBlur })}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
              (settings.windowBackgroundBlur ?? false) ? 'bg-foreground' : 'bg-muted-foreground/30'
            }`}
          >
            <span
              className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
                (settings.windowBackgroundBlur ?? false) ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {blurPendingRestart ? (
          <div className="flex items-center justify-between gap-3 rounded-md border border-yellow-500/50 bg-yellow-500/10 px-3 py-2.5">
            <div className="min-w-0 flex-1 space-y-0.5">
              <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                {t('settings.terminal.window.restartRequired')}
              </p>
              <p className="text-xs text-muted-foreground">
                {t('settings.terminal.window.restartDescription')}
              </p>
            </div>
            <Button
              size="sm"
              variant="default"
              className="shrink-0 gap-1.5"
              disabled={relaunchingBlur}
              onClick={() => void handleRelaunch()}
            >
              <RotateCw className={`size-3 ${relaunchingBlur ? 'animate-spin' : ''}`} />
              {relaunchingBlur
                ? t('settings.terminal.window.restarting')
                : t('settings.terminal.window.restartNow')}
            </Button>
          </div>
        ) : null}
      </SearchableSetting>

      <SearchableSetting
        title={t('settings.terminal.window.horizontalPaddingLabel')}
        description={t('settings.terminal.window.horizontalPaddingDescription')}
        keywords={['padding', 'horizontal', 'spacing', 'margin']}
      >
        <NumberField
          label={t('settings.terminal.window.horizontalPaddingLabel')}
          description={t('settings.terminal.window.horizontalPaddingDescription')}
          value={settings.terminalPaddingX ?? 4}
          defaultValue={4}
          min={0}
          max={512}
          step={1}
          suffix="px"
          onChange={(value) => updateSettings({ terminalPaddingX: Math.max(0, value) })}
        />
      </SearchableSetting>

      <SearchableSetting
        title={t('settings.terminal.window.verticalPaddingLabel')}
        description={t('settings.terminal.window.verticalPaddingDescription')}
        keywords={['padding', 'vertical', 'spacing', 'margin']}
      >
        <NumberField
          label={t('settings.terminal.window.verticalPaddingLabel')}
          description={t('settings.terminal.window.verticalPaddingDescription')}
          value={settings.terminalPaddingY ?? 4}
          defaultValue={4}
          min={0}
          max={512}
          step={1}
          suffix="px"
          onChange={(value) => updateSettings({ terminalPaddingY: Math.max(0, value) })}
        />
      </SearchableSetting>

      <SearchableSetting
        title={t('settings.terminal.window.hideMouseWhileTypingLabel')}
        description={t('settings.terminal.window.hideMouseWhileTypingDescription')}
        keywords={['mouse', 'hide', 'typing', 'cursor']}
        className="flex items-center justify-between gap-4 px-1 py-2"
      >
        <div className="space-y-0.5">
          <Label>{t('settings.terminal.window.hideMouseWhileTypingLabel')}</Label>
          <p className="text-xs text-muted-foreground">
            {t('settings.terminal.window.hideMouseWhileTypingDescription')}
          </p>
        </div>
        <button
          role="switch"
          aria-checked={settings.terminalMouseHideWhileTyping ?? false}
          onClick={() =>
            updateSettings({
              terminalMouseHideWhileTyping: !settings.terminalMouseHideWhileTyping
            })
          }
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
            (settings.terminalMouseHideWhileTyping ?? false)
              ? 'bg-foreground'
              : 'bg-muted-foreground/30'
          }`}
        >
          <span
            className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
              (settings.terminalMouseHideWhileTyping ?? false) ? 'translate-x-4' : 'translate-x-0.5'
            }`}
          />
        </button>
      </SearchableSetting>

      <SearchableSetting
        title={t('settings.terminal.window.colorOverridesLabel')}
        description={t('settings.terminal.window.colorOverridesDescription')}
        keywords={['color', 'override', 'ansi', 'palette', 'theme']}
        className="space-y-3"
      >
        <div className="space-y-2">
          <button
            onClick={() => setColorOverridesExpanded((prev) => !prev)}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <span className={`transition-transform ${colorOverridesExpanded ? 'rotate-90' : ''}`}>
              ▶
            </span>
            {t('settings.terminal.window.colorOverridesButton')}
          </button>
          <div
            className={`grid overflow-hidden transition-all duration-300 ease-out ${
              colorOverridesExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="min-h-0 space-y-4">
              {colorOverrideGroups.map((group) => (
                <div key={group.label} className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">{group.label}</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {group.keys.map((item) => (
                      <ColorField
                        key={item.key}
                        label={item.label}
                        description={item.description}
                        value={settings.terminalColorOverrides?.[item.key] ?? ''}
                        fallback=""
                        onChange={(value) =>
                          updateSettings({
                            terminalColorOverrides: {
                              ...settings.terminalColorOverrides,
                              [item.key]: value || undefined
                            }
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateSettings({ terminalColorOverrides: undefined })}
              >
                {t('settings.terminal.window.resetAllColorOverrides')}
              </Button>
            </div>
          </div>
        </div>
      </SearchableSetting>
    </section>
  )
}
