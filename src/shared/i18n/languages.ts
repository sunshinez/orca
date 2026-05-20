export const ORCA_LANGUAGES = ['en', 'zh-CN'] as const

export type OrcaLanguage = (typeof ORCA_LANGUAGES)[number]

export const ORCA_LANGUAGE_LABELS: Record<OrcaLanguage, string> = {
  en: 'English',
  'zh-CN': '简体中文'
}

export const ORCA_FALLBACK_LANGUAGE: OrcaLanguage = 'en'

export function isOrcaLanguage(value: string): value is OrcaLanguage {
  return (ORCA_LANGUAGES as readonly string[]).includes(value)
}

export function resolveLanguagePreference(detected: string | undefined): OrcaLanguage {
  if (!detected) {
    return ORCA_FALLBACK_LANGUAGE
  }
  const normalized = detected.toLowerCase().replace(/_/g, '-')
  if (isOrcaLanguage(normalized)) {
    return normalized
  }
  // Why: accept broad matches like 'zh' or 'zh-hk' falling back to 'zh-CN'.
  if (normalized.startsWith('zh')) {
    return 'zh-CN'
  }
  return ORCA_FALLBACK_LANGUAGE
}
