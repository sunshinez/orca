import { useTranslation } from 'react-i18next'
import type { GlobalSettings } from '../../../../shared/types'
import { Label } from '../ui/label'
import { SearchableSetting } from './SearchableSetting'
import type { SettingsSearchEntry } from './settings-search'
import { isLinuxUserAgent } from '@/components/terminal-pane/pane-helpers'

export const INPUT_PANE_SEARCH_ENTRIES: SettingsSearchEntry[] = [
  {
    title: 'Middle-click Paste from Selection',
    description:
      'On Linux, selected text uses the system selection clipboard. Other platforms use a private buffer when enabled.',
    keywords: [
      'input',
      'editing',
      'selection',
      'primary selection',
      'middle click',
      'middle mouse',
      'paste',
      'clipboard',
      'x11',
      'linux'
    ]
  }
]
// Why: search entries stay in English so the settings search works across
// language switches. Only the rendered labels are translated.

type InputPaneProps = {
  settings: GlobalSettings
  updateSettings: (updates: Partial<GlobalSettings>) => void
}

export function InputPane({ settings, updateSettings }: InputPaneProps): React.JSX.Element {
  const { t } = useTranslation()
  const enabled = settings.primarySelectionMiddleClickPaste ?? isLinuxUserAgent()

  return (
    <section className="space-y-4">
      <SearchableSetting
        title={t('settings.input.middleClickPaste.label')}
        description={t('settings.input.middleClickPaste.description')}
        keywords={[
          'input',
          'editing',
          'selection',
          'primary selection',
          'middle click',
          'middle mouse',
          'paste',
          'clipboard',
          'x11',
          'linux'
        ]}
        className="flex items-center justify-between gap-4 px-1 py-2"
      >
        <div className="space-y-0.5">
          <Label>{t('settings.input.middleClickPaste.label')}</Label>
          <p className="text-xs text-muted-foreground">
            {t('settings.input.middleClickPaste.description')}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() =>
            updateSettings({
              primarySelectionMiddleClickPaste: !enabled
            })
          }
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors ${
            enabled ? 'bg-foreground' : 'bg-muted-foreground/30'
          }`}
        >
          <span
            className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
              enabled ? 'translate-x-4' : 'translate-x-0.5'
            }`}
          />
        </button>
      </SearchableSetting>
    </section>
  )
}
