import type { TFunction } from 'i18next'
import type { SettingsSearchEntry } from './settings-search'

export function getRuntimeEnvironmentsSearchEntry(t: TFunction): SettingsSearchEntry {
  return {
    title: t('settings.sections.servers.title'),
    description: t('settings.sections.servers.descriptionDesktop'),
    keywords: [
      'runtime',
      'environment',
      'server',
      'client',
      'remote',
      'pairing',
      'pairing url',
      'web client',
      'cloud',
      'vm',
      'dev box'
    ]
  }
}

export function getWebRuntimeEnvironmentsSearchEntry(t: TFunction): SettingsSearchEntry {
  return {
    title: t('settings.sections.servers.title'),
    description: t('settings.sections.servers.descriptionWeb'),
    keywords: [
      'runtime',
      'environment',
      'server',
      'client',
      'remote',
      'pairing code',
      'cloud',
      'vm'
    ]
  }
}
