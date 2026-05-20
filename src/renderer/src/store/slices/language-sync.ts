import { changeOrcaLanguage } from '@/i18n'
import { resolveLanguagePreference } from '../../../../shared/i18n/languages'

export { changeOrcaLanguage }

export async function syncLanguageWithSettings(
  settings: { language?: string },
  writeSettings: (updates: { language: string }) => Promise<unknown>
): Promise<void> {
  const effective = settings.language ?? resolveLanguagePreference(navigator.language)
  if (effective !== settings.language) {
    await writeSettings({ language: effective })
    settings.language = effective
  }
  changeOrcaLanguage(effective)
}
