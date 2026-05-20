import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import {
  ORCA_FALLBACK_LANGUAGE,
  resolveLanguagePreference,
  type OrcaLanguage
} from '../../shared/i18n/languages'
import { en } from './locales/en'
import { zhCN } from './locales/zh-CN'

const resources: Record<OrcaLanguage, { translation: Record<string, unknown> }> = {
  en: { translation: en as Record<string, unknown> },
  'zh-CN': { translation: zhCN as Record<string, unknown> }
}

export function initI18n(initialLanguage?: string): typeof i18next {
  const resolved = resolveLanguagePreference(initialLanguage)

  i18next.use(initReactI18next).init({
    lng: resolved,
    fallbackLng: ORCA_FALLBACK_LANGUAGE,
    resources,
    interpolation: {
      escapeValue: false // Why: React already escapes JSX; double-escaping would break rendered HTML.
    },
    // Why: disable suspense so that t() returns the fallback key immediately
    // on first render instead of throwing a promise. Orca's store-driven
    // hydration does not expect React Suspense boundaries inside leaf
    // components.
    react: {
      useSuspense: false
    }
  })

  return i18next
}

export function changeOrcaLanguage(language: string): void {
  const resolved = resolveLanguagePreference(language)
  if (i18next.language !== resolved) {
    void i18next.changeLanguage(resolved)
  }
}

export { i18next }
