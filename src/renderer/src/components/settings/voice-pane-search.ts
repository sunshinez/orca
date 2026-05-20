import type { TFunction } from 'i18next'
import type { SettingsSearchEntry } from './settings-search'

export function getVoicePaneSearchEntries(t: TFunction): SettingsSearchEntry[] {
  return [
    {
      title: t('settings.voice.enableDictation'),
      description: t('settings.voice.enableDictationDescription', { shortcut: '' }),
      keywords: ['voice', 'dictation', 'speech', 'microphone', 'stt']
    },
    {
      title: t('settings.voice.dictationMode'),
      description: t('settings.voice.dictationModeDescription', { shortcut: '' }),
      keywords: ['voice', 'dictation', 'mode', 'toggle', 'hold', 'push to talk']
    },
    {
      title: t('settings.voice.speechModel'),
      description: t('settings.voice.selectModelDescription'),
      keywords: ['voice', 'model', 'speech', 'stt', 'download']
    }
  ]
}
