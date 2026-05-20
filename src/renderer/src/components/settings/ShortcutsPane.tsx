import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { CtrlTabOrderMode } from '../../../../shared/types'
import { useAppStore } from '../../store'
import { ShortcutKeyCombo } from '../ShortcutKeyCombo'
import { SearchableSetting } from './SearchableSetting'
import { matchesSettingsSearch, type SettingsSearchEntry } from './settings-search'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type ShortcutItem = {
  action: string
  keys: string[]
}

type ShortcutGroup = {
  title: string
  items: ShortcutItem[]
}

type ShortcutDefinition = {
  actionKey: string
  searchKeywords: string[]
  keys: (labels: { mod: string; shift: string; enter: string }) => string[]
}

type ShortcutGroupDefinition = {
  titleKey: string
  items: ShortcutDefinition[]
}

const SHORTCUT_GROUP_DEFINITIONS: ShortcutGroupDefinition[] = [
  {
    titleKey: 'settings.shortcuts.groups.global',
    items: [
      {
        actionKey: 'settings.shortcuts.actions.goToFile',
        searchKeywords: ['shortcut', 'global', 'file'],
        keys: ({ mod }) => [mod, 'P']
      },
      {
        actionKey: 'settings.shortcuts.actions.switchWorktree',
        searchKeywords: ['shortcut', 'global', 'worktree', 'switch', 'jump'],
        keys: ({ mod, shift }) => (mod === '⌘' ? [mod, 'J'] : [mod, shift, 'J'])
      },
      {
        actionKey: 'settings.shortcuts.actions.createWorktree',
        searchKeywords: ['shortcut', 'global', 'worktree'],
        keys: ({ mod }) => [mod, 'N']
      },
      {
        actionKey: 'settings.shortcuts.actions.toggleSidebar',
        searchKeywords: ['shortcut', 'sidebar'],
        keys: ({ mod }) => [mod, 'B']
      },
      {
        actionKey: 'settings.shortcuts.actions.toggleRightSidebar',
        searchKeywords: ['shortcut', 'sidebar', 'right'],
        keys: ({ mod }) => [mod, 'L']
      },
      {
        actionKey: 'settings.shortcuts.actions.moveUpWorktree',
        searchKeywords: ['shortcut', 'global', 'worktree', 'move'],
        keys: ({ mod, shift }) => [mod, shift, '↑']
      },
      {
        actionKey: 'settings.shortcuts.actions.moveDownWorktree',
        searchKeywords: ['shortcut', 'global', 'worktree', 'move'],
        keys: ({ mod, shift }) => [mod, shift, '↓']
      },
      {
        actionKey: 'settings.shortcuts.actions.toggleFileExplorer',
        searchKeywords: ['shortcut', 'file explorer'],
        keys: ({ mod, shift }) => [mod, shift, 'E']
      },
      {
        actionKey: 'settings.shortcuts.actions.toggleSearch',
        searchKeywords: ['shortcut', 'search'],
        keys: ({ mod, shift }) => [mod, shift, 'F']
      },
      {
        actionKey: 'settings.shortcuts.actions.toggleSourceControl',
        searchKeywords: ['shortcut', 'source control'],
        keys: ({ mod, shift }) => [mod, shift, 'G']
      },
      {
        actionKey: 'settings.shortcuts.actions.zoomIn',
        searchKeywords: ['shortcut', 'zoom', 'in', 'scale'],
        keys: ({ mod, shift }) => (mod === 'Ctrl' ? [mod, shift, '+'] : [mod, '+'])
      },
      {
        actionKey: 'settings.shortcuts.actions.zoomOut',
        searchKeywords: ['shortcut', 'zoom', 'out', 'scale'],
        keys: ({ mod, shift }) => (mod === 'Ctrl' ? [mod, shift, '-'] : [mod, '-'])
      },
      {
        actionKey: 'settings.shortcuts.actions.resetSize',
        searchKeywords: ['shortcut', 'zoom', 'reset', 'size', 'actual'],
        keys: ({ mod }) => [mod, '0']
      },
      {
        actionKey: 'settings.shortcuts.actions.forceReload',
        searchKeywords: ['shortcut', 'reload', 'refresh', 'force'],
        keys: ({ mod, shift }) => [mod, shift, 'R']
      },
      {
        actionKey: 'settings.shortcuts.actions.dictation',
        searchKeywords: ['shortcut', 'dictation', 'voice', 'speech', 'microphone'],
        keys: ({ mod }) => [mod, 'E']
      }
    ]
  },
  {
    titleKey: 'settings.shortcuts.groups.tabs',
    items: [
      {
        actionKey: 'settings.shortcuts.actions.newTerminalTab',
        searchKeywords: ['shortcut', 'tab', 'terminal', 'new'],
        keys: ({ mod }) => [mod, 'T']
      },
      {
        actionKey: 'settings.shortcuts.actions.newBrowserTab',
        searchKeywords: ['shortcut', 'tab', 'browser', 'new'],
        keys: ({ mod, shift }) => [mod, shift, 'B']
      },
      {
        actionKey: 'settings.shortcuts.actions.newMarkdownTab',
        searchKeywords: ['shortcut', 'tab', 'markdown', 'file', 'new'],
        keys: ({ mod, shift }) => [mod, shift, 'M']
      },
      {
        actionKey: 'settings.shortcuts.actions.closeActiveTab',
        searchKeywords: ['shortcut', 'close', 'tab', 'pane'],
        keys: ({ mod }) => [mod, 'W']
      },
      {
        actionKey: 'settings.shortcuts.actions.reopenClosedTab',
        searchKeywords: ['shortcut', 'tab', 'reopen', 'restore', 'closed'],
        keys: ({ mod, shift }) => [mod, shift, 'T']
      }
    ]
  },
  {
    titleKey: 'settings.shortcuts.groups.tabNavigation',
    items: [
      {
        actionKey: 'settings.shortcuts.actions.cycleTabsForward',
        searchKeywords: ['shortcut', 'tab', 'next', 'switch', 'cycle', 'recent', 'ctrl'],
        keys: () => ['Ctrl', 'Tab']
      },
      {
        actionKey: 'settings.shortcuts.actions.cycleTabsBackward',
        searchKeywords: ['shortcut', 'tab', 'previous', 'switch', 'cycle', 'recent', 'ctrl'],
        keys: ({ shift }) => ['Ctrl', shift, 'Tab']
      },
      {
        actionKey: 'settings.shortcuts.actions.nextTabSameType',
        searchKeywords: ['shortcut', 'tab', 'next', 'switch', 'cycle'],
        keys: ({ mod, shift }) => [mod, shift, ']']
      },
      {
        actionKey: 'settings.shortcuts.actions.previousTabSameType',
        searchKeywords: ['shortcut', 'tab', 'previous', 'switch', 'cycle'],
        keys: ({ mod, shift }) => [mod, shift, '[']
      },
      {
        actionKey: 'settings.shortcuts.actions.nextTabAllTypes',
        searchKeywords: ['shortcut', 'tab', 'next', 'switch', 'cycle', 'all', 'any'],
        keys: ({ mod }) => [mod, mod === '⌘' ? '⌥' : 'Alt', ']']
      },
      {
        actionKey: 'settings.shortcuts.actions.previousTabAllTypes',
        searchKeywords: ['shortcut', 'tab', 'previous', 'switch', 'cycle', 'all', 'any'],
        keys: ({ mod }) => [mod, mod === '⌘' ? '⌥' : 'Alt', '[']
      },
      {
        actionKey: 'settings.shortcuts.actions.nextTerminalTab',
        searchKeywords: ['shortcut', 'tab', 'terminal', 'next', 'switch'],
        keys: () => ['Ctrl', 'PageDown']
      },
      {
        actionKey: 'settings.shortcuts.actions.previousTerminalTab',
        searchKeywords: ['shortcut', 'tab', 'terminal', 'previous', 'switch'],
        keys: () => ['Ctrl', 'PageUp']
      }
    ]
  },
  {
    titleKey: 'settings.shortcuts.groups.terminalPanes',
    items: [
      {
        actionKey: 'settings.shortcuts.actions.splitTerminalRight',
        searchKeywords: ['shortcut', 'pane', 'split'],
        // Why: on Windows/Linux, Ctrl+D must pass through as EOF (#586),
        // so split-right requires Shift on non-Mac platforms.
        keys: ({ mod, shift }) => (mod === '⌘' ? [mod, 'D'] : [mod, shift, 'D'])
      },
      {
        actionKey: 'settings.shortcuts.actions.splitTerminalDown',
        searchKeywords: ['shortcut', 'pane', 'split'],
        // Why: on Windows/Linux, Ctrl+Shift+D is taken by split-right (#586),
        // so split-down uses Alt+Shift+D following Windows Terminal convention.
        keys: ({ mod, shift }) => (mod === '⌘' ? [mod, shift, 'D'] : ['Alt', shift, 'D'])
      },
      {
        actionKey: 'settings.shortcuts.actions.closePane',
        searchKeywords: ['shortcut', 'pane', 'close', 'eof'],
        keys: () => ['Ctrl', 'D']
      },
      {
        actionKey: 'settings.shortcuts.actions.focusNextPane',
        searchKeywords: ['shortcut', 'pane', 'focus', 'next'],
        keys: ({ mod }) => [mod, ']']
      },
      {
        actionKey: 'settings.shortcuts.actions.focusPreviousPane',
        searchKeywords: ['shortcut', 'pane', 'focus', 'previous'],
        keys: ({ mod }) => [mod, '[']
      },
      {
        actionKey: 'settings.shortcuts.actions.clearActivePane',
        searchKeywords: ['shortcut', 'pane', 'clear'],
        keys: ({ mod }) => [mod, 'K']
      },
      {
        actionKey: 'settings.shortcuts.actions.expandCollapsePane',
        searchKeywords: ['shortcut', 'pane', 'expand', 'collapse'],
        keys: ({ mod, shift, enter }) => [mod, shift, enter]
      }
    ]
  },
  {
    titleKey: 'settings.shortcuts.groups.editors',
    items: [
      {
        actionKey: 'settings.shortcuts.actions.showMarkdownPreview',
        searchKeywords: ['shortcut', 'editor', 'markdown', 'preview'],
        keys: ({ mod, shift }) => [mod, shift, 'V']
      }
    ]
  }
]

// Why: search is supposed to stay in lockstep with the rendered shortcuts. Deriving
// both from one definition prevents the registry drift regression this branch introduced.
export const SHORTCUTS_PANE_SEARCH_ENTRIES: SettingsSearchEntry[] = [
  ...SHORTCUT_GROUP_DEFINITIONS.flatMap((group) =>
    group.items.map((item) => ({
      title: item.actionKey,
      description: `${group.titleKey} shortcut`,
      keywords: item.searchKeywords
    }))
  ),
  {
    title: 'Ctrl+Tab Order',
    description: 'Choose recent or sequential tab switching.',
    keywords: ['shortcut', 'tab', 'ctrl', 'control', 'recent', 'mru', 'sequential', 'switch']
  }
]

export function ShortcutsPane(): React.JSX.Element {
  const { t } = useTranslation()
  const searchQuery = useAppStore((state) => state.settingsSearchQuery)
  const ctrlTabOrderMode = useAppStore((state) => state.settings?.ctrlTabOrderMode ?? 'mru')
  const updateSettings = useAppStore((state) => state.updateSettings)
  const isMac = navigator.userAgent.includes('Mac')
  const mod = isMac ? '⌘' : 'Ctrl'
  const shift = isMac ? '⇧' : 'Shift'
  const enter = isMac ? '↵' : 'Enter'

  const groups = useMemo<ShortcutGroup[]>(
    () =>
      SHORTCUT_GROUP_DEFINITIONS.map((group) => ({
        title: t(group.titleKey),
        items: group.items.map((item) => ({
          action: t(item.actionKey),
          keys: item.keys({ mod, shift, enter })
        }))
      })),
    [mod, shift, enter, t]
  )

  // Why: keywords here must match the ones used by SHORTCUTS_PANE_SEARCH_ENTRIES
  // (which uses searchKeywords from SHORTCUT_GROUP_DEFINITIONS). Using item.keys
  // (rendered key labels like ['Cmd', 'P']) would cause a mismatch where sidebar-level
  // search finds a shortcut but the inner SearchableSetting hides it.
  const groupEntries = useMemo<Record<string, SettingsSearchEntry[]>>(
    () =>
      Object.fromEntries(
        SHORTCUT_GROUP_DEFINITIONS.map((groupDef) => [
          t(groupDef.titleKey),
          groupDef.items.map((defItem) => ({
            title: t(defItem.actionKey),
            description: `${t(groupDef.titleKey)} ${t('settings.shortcuts.shortcut')}`,
            keywords: defItem.searchKeywords
          }))
        ])
      ),
    [t]
  )

  const ctrlTabSearchEntries: SettingsSearchEntry[] = useMemo(
    () => [
      {
        title: t('settings.shortcuts.ctrlTabOrder.title'),
        description: t('settings.shortcuts.ctrlTabOrder.description'),
        keywords: ['shortcut', 'tab', 'ctrl', 'control', 'recent', 'mru', 'sequential', 'switch']
      }
    ],
    [t]
  )

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">{t('settings.shortcuts.title')}</h2>
          <p className="text-xs text-muted-foreground">{t('settings.shortcuts.subtitle')}</p>
        </div>

        {matchesSettingsSearch(searchQuery, ctrlTabSearchEntries) ? (
          <SearchableSetting
            title={t('settings.shortcuts.ctrlTabOrder.title')}
            description={t('settings.shortcuts.ctrlTabOrder.description')}
            keywords={ctrlTabSearchEntries[0].keywords}
            className="flex items-center justify-between gap-4 px-1 py-2"
          >
            <div className="space-y-0.5">
              <Label>{t('settings.shortcuts.ctrlTabOrder.label')}</Label>
              <p className="text-xs text-muted-foreground">
                {t('settings.shortcuts.ctrlTabOrder.helper')}
              </p>
            </div>
            <Select
              value={ctrlTabOrderMode}
              onValueChange={(value) =>
                void updateSettings({ ctrlTabOrderMode: value as CtrlTabOrderMode })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mru">
                  {t('settings.shortcuts.ctrlTabOrder.mostRecent')}
                </SelectItem>
                <SelectItem value="sequential">
                  {t('settings.shortcuts.ctrlTabOrder.tabStripOrder')}
                </SelectItem>
              </SelectContent>
            </Select>
          </SearchableSetting>
        ) : null}

        <div className="grid gap-8">
          {groups
            .filter((group) => matchesSettingsSearch(searchQuery, groupEntries[group.title] ?? []))
            .map((group) => (
              <div key={group.title} className="space-y-3">
                <h3 className="border-b border-border/50 pb-2 text-sm font-medium text-muted-foreground">
                  {group.title}
                </h3>
                <div className="grid gap-2">
                  {group.items.map((item, idx) => {
                    // Why: look up the definition's searchKeywords so the inner
                    // SearchableSetting matches the same terms as the sidebar search.
                    const defGroup = SHORTCUT_GROUP_DEFINITIONS.find(
                      (g) => t(g.titleKey) === group.title
                    )
                    const defItem = defGroup?.items.find((d) => t(d.actionKey) === item.action)
                    const keywords = defItem?.searchKeywords ?? item.keys

                    return (
                      <SearchableSetting
                        key={idx}
                        title={item.action}
                        description={`${group.title} ${t('settings.shortcuts.shortcut')}`}
                        keywords={keywords}
                        className="flex items-center justify-between py-1"
                      >
                        <span className="text-sm text-foreground">{item.action}</span>
                        <ShortcutKeyCombo keys={item.keys} />
                      </SearchableSetting>
                    )
                  })}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}
