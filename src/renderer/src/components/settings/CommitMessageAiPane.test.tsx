import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { GlobalSettings } from '../../../../shared/types'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))
import { useAppStore } from '../../store'
import { CommitMessageAiPane } from './CommitMessageAiPane'
import { COMMIT_MESSAGE_AI_PANE_SEARCH_ENTRIES } from './commit-message-ai-search'

function renderPane(settings: GlobalSettings): string {
  return renderToStaticMarkup(
    React.createElement(CommitMessageAiPane, {
      settings,
      updateSettings: () => {}
    })
  )
}

function buildSettings(overrides: Partial<GlobalSettings> = {}): GlobalSettings {
  return {
    commitMessageAi: {
      enabled: false,
      agentId: null,
      selectedModelByAgent: {},
      selectedThinkingByModel: {},
      customPrompt: '',
      customAgentCommand: ''
    },
    ...overrides
  } as GlobalSettings
}

describe('CommitMessageAiPane', () => {
  beforeEach(() => {
    useAppStore.setState({ settingsSearchQuery: '' })
  })

  it('renders only the opt-in control before the feature is enabled', () => {
    const markup = renderPane(buildSettings())

    expect(markup).toContain('settings.commitMessageAi.sectionTitle')
    expect(markup).toContain('settings.commitMessageAi.sectionDescription')
    expect(markup).toContain('aria-checked="false"')
    expect(markup).not.toContain('settings.commitMessageAi.agent.title')
    expect(markup).not.toContain('settings.commitMessageAi.thinking.title')
  })

  it('renders model, thinking, and prompt controls for enabled preset agents', () => {
    const markup = renderPane(
      buildSettings({
        commitMessageAi: {
          enabled: true,
          agentId: 'codex',
          selectedModelByAgent: { codex: 'gpt-5.5' },
          selectedThinkingByModel: { 'gpt-5.5': 'medium' },
          customPrompt: 'Use Conventional Commits.',
          customAgentCommand: ''
        }
      })
    )

    expect(markup).toContain('aria-checked="true"')
    expect(markup).toContain('settings.commitMessageAi.agent.label')
    expect(markup).toContain('settings.commitMessageAi.model.label')
    expect(markup).toContain('settings.commitMessageAi.thinking.label')
    expect(markup).toContain('settings.commitMessageAi.thinking.helper')
    expect(markup).toContain('Use Conventional Commits.')
    expect(markup).toContain('common.save')
    expect(markup).toContain('settings.commitMessageAi.customPrompt.saved')
  })

  it('renders custom command settings for custom agents', () => {
    const markup = renderPane(
      buildSettings({
        commitMessageAi: {
          enabled: true,
          agentId: 'custom',
          selectedModelByAgent: {},
          selectedThinkingByModel: {},
          customPrompt: '',
          customAgentCommand: 'ollama run llama3.1 {prompt}'
        }
      })
    )

    expect(markup).toContain('settings.commitMessageAi.sectionTitle')
    expect(markup).toContain('settings.commitMessageAi.customCommand.label')
    expect(markup).toContain('ollama run llama3.1 {prompt}')
  })

  it('shows an unconfigured state when the default agent is unsupported', () => {
    const markup = renderPane(
      buildSettings({
        defaultTuiAgent: 'gemini',
        commitMessageAi: {
          enabled: true,
          agentId: null,
          selectedModelByAgent: {},
          selectedThinkingByModel: {},
          customPrompt: '',
          customAgentCommand: ''
        }
      })
    )

    expect(markup).toContain('settings.commitMessageAi.agent.notConfigured')
    expect(markup).toContain('settings.commitMessageAi.agent.unsupportedDefault')
    expect(markup).not.toContain('settings.commitMessageAi.model.helper')
    expect(markup).not.toContain('settings.commitMessageAi.thinking.label')
  })

  it('keeps custom command discoverable in settings search metadata', () => {
    const customCommandEntry = COMMIT_MESSAGE_AI_PANE_SEARCH_ENTRIES.find(
      (entry) => entry.title === 'Custom command'
    )

    expect(customCommandEntry?.keywords).toEqual(
      expect.arrayContaining(['custom', 'command', 'ollama'])
    )
  })
})
