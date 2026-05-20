import type { TFunction } from 'i18next'
import type { SettingsSearchEntry } from './settings-search'

export function getGeneralWorkspaceSearchEntries(t: TFunction): SettingsSearchEntry[] {
  return [
    {
      title: t('settings.general.workspace.directory.label'),
      description: t('settings.general.workspace.directory.description'),
      keywords: ['workspace', 'folder', 'path', 'worktree']
    },
    {
      title: t('settings.general.workspace.nest.label'),
      description: t('settings.general.workspace.nest.description'),
      keywords: ['nested', 'subfolder', 'directory']
    },
    {
      title: t('settings.general.workspace.askBeforeDeletingWorktrees.label'),
      description: t('settings.general.workspace.askBeforeDeletingWorktrees.description'),
      keywords: ['delete', 'worktree', 'confirm', 'dialog', 'skip', 'prompt']
    },
    {
      title: t('settings.general.workspace.askBeforeDeletingAutomations.label'),
      description: t('settings.general.workspace.askBeforeDeletingAutomations.description'),
      keywords: ['delete', 'automation', 'confirm', 'dialog', 'skip', 'prompt']
    },
    {
      title: t('settings.general.openInMenu.title'),
      description: t('settings.general.openInMenu.description'),
      keywords: ['open in', 'editor', 'launcher', 'cursor', 'zed', 'command', 'vscode']
    }
  ]
}

export function getGeneralEditorSearchEntries(t: TFunction): SettingsSearchEntry[] {
  return [
    {
      title: t('settings.general.editor.autoSave.label'),
      description: t('settings.general.editor.autoSave.description'),
      keywords: ['autosave', 'save']
    },
    {
      title: t('settings.general.editor.autoSaveDelay.label'),
      description: t('settings.general.editor.autoSaveDelay.description'),
      keywords: ['autosave', 'delay', 'milliseconds']
    },
    {
      title: t('settings.general.editor.defaultDiffView.label'),
      description: t('settings.general.editor.defaultDiffView.description'),
      keywords: ['diff', 'view', 'inline', 'side-by-side', 'split']
    },
    {
      title: t('settings.general.editor.defaultDiffFileTree.label'),
      description: t('settings.general.editor.defaultDiffFileTree.description'),
      keywords: ['diff', 'tree', 'file tree', 'combined diff', 'sidebar']
    },
    {
      title: t('settings.general.editor.minimap.label'),
      description: t('settings.general.editor.minimap.description'),
      keywords: ['minimap', 'overview', 'code', 'scroll']
    },
    {
      title: t('settings.general.editor.markdownReviewNotes.label'),
      description: t('settings.general.editor.markdownReviewNotes.description'),
      keywords: ['markdown', 'review', 'notes', 'annotations', 'agents']
    }
  ]
}

export function getGeneralCliSearchEntries(t: TFunction): SettingsSearchEntry[] {
  return [
    {
      title: t('settings.cli.shellCommandLabel'),
      description: t('settings.cli.description'),
      keywords: ['cli', 'path', 'terminal', 'command']
    },
    {
      title: t('settings.cli.agentSkillsLabel'),
      description: t('settings.cli.agentSkillsDescription'),
      keywords: ['skill', 'agents', 'npx']
    }
  ]
}

export function getGeneralUpdateSearchEntries(t: TFunction): SettingsSearchEntry[] {
  return [
    {
      title: t('settings.general.updates.check.label'),
      description: t('settings.general.updates.check.description'),
      keywords: ['update', 'version', 'release notes', 'download']
    }
  ]
}

export function getGeneralCacheTimerSearchEntries(t: TFunction): SettingsSearchEntry[] {
  return [
    {
      title: t('settings.general.cacheTimer.title'),
      description: t('settings.general.cacheTimer.description'),
      keywords: ['cache', 'timer', 'prompt', 'ttl', 'claude', 'cost', 'tokens']
    }
  ]
}

export function getGeneralSupportSearchEntries(t: TFunction): SettingsSearchEntry[] {
  return [
    {
      title: t('settings.general.support.starGithub.label'),
      description: t('settings.general.support.starGithub.description'),
      keywords: ['star', 'github', 'support', 'feedback', 'like']
    }
  ]
}

export function getGeneralPaneSearchEntries(t: TFunction): SettingsSearchEntry[] {
  return [
    ...getGeneralWorkspaceSearchEntries(t),
    ...getGeneralEditorSearchEntries(t),
    ...getGeneralCliSearchEntries(t),
    ...getGeneralCacheTimerSearchEntries(t),
    ...getGeneralUpdateSearchEntries(t),
    ...getGeneralSupportSearchEntries(t)
  ]
}
