import { menuEn } from './menu-en'
import { menuZhCN } from './menu-zh-CN'

export type MenuLocale = Record<string, unknown>

const resources: Record<string, MenuLocale> = {
  en: menuEn,
  'zh-CN': menuZhCN
}

/** Return a translator function for menu strings in the given language.
 *  Falls back to English for missing keys or unsupported languages. */
export function getMenuTranslator(language: string | undefined): (key: string) => string {
  const locale = resources[language ?? ''] ?? menuEn

  return (key: string): string => {
    const parts = key.split('.')
    let value: unknown = locale
    for (const part of parts) {
      if (value !== null && typeof value === 'object' && part in value) {
        value = (value as Record<string, unknown>)[part]
      } else {
        // Fallback to English
        value = menuEn
        for (const p of parts) {
          if (value !== null && typeof value === 'object' && p in value) {
            value = (value as Record<string, unknown>)[p]
          } else {
            return key
          }
        }
        break
      }
    }
    return typeof value === 'string' ? value : key
  }
}
