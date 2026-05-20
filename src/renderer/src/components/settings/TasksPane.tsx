import { useTranslation } from 'react-i18next'
import { Check, Github, Gitlab } from 'lucide-react'
import type { GlobalSettings, TaskProvider } from '../../../../shared/types'
import {
  TASK_PROVIDERS,
  normalizeVisibleTaskProviders,
  resolveVisibleTaskProvider
} from '../../../../shared/task-providers'
import { cn } from '@/lib/utils'
import { LinearIcon } from '@/components/icons/LinearIcon'
import { Label } from '../ui/label'
import { SearchableSetting } from './SearchableSetting'

type TasksPaneProps = {
  settings: GlobalSettings
  updateSettings: (updates: Partial<GlobalSettings>) => void
}

const TASK_PROVIDER_ICONS: Record<
  TaskProvider,
  (props: { className?: string }) => React.JSX.Element
> = {
  github: ({ className }) => <Github className={className} />,
  gitlab: ({ className }) => <Gitlab className={className} />,
  linear: ({ className }) => <LinearIcon className={className} />
}

export function TasksPane({ settings, updateSettings }: TasksPaneProps): React.JSX.Element {
  const { t } = useTranslation()
  const visibleProviders = normalizeVisibleTaskProviders(settings.visibleTaskProviders)

  const toggleProvider = (provider: TaskProvider): void => {
    const isVisible = visibleProviders.includes(provider)
    if (isVisible && visibleProviders.length === 1) {
      return
    }

    const nextProviders = isVisible
      ? visibleProviders.filter((entry) => entry !== provider)
      : TASK_PROVIDERS.filter((entry) => entry === provider || visibleProviders.includes(entry))

    updateSettings({
      visibleTaskProviders: nextProviders,
      defaultTaskSource: resolveVisibleTaskProvider(settings.defaultTaskSource, nextProviders)
    })
  }

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{t('settings.tasks.taskSources.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('settings.tasks.taskSources.description')}
          </p>
        </div>

        <SearchableSetting
          title={t('settings.tasks.taskProviders.title')}
          description={t('settings.tasks.taskProviders.description')}
          keywords={[
            'tasks',
            'provider',
            'source',
            'github',
            'gitlab',
            'linear',
            'display',
            'hide'
          ]}
          className="grid gap-2"
        >
          {(['github', 'gitlab', 'linear'] as const).map((providerId) => {
            const enabled = visibleProviders.includes(providerId)
            const isLastEnabled = enabled && visibleProviders.length === 1
            const Icon = TASK_PROVIDER_ICONS[providerId]

            return (
              <button
                key={providerId}
                type="button"
                role="checkbox"
                aria-checked={enabled}
                aria-disabled={isLastEnabled}
                onClick={() => toggleProvider(providerId)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-md border border-border/60 px-3 py-2.5 text-left transition-colors',
                  enabled
                    ? 'bg-accent/70 text-accent-foreground'
                    : 'bg-transparent hover:bg-muted/50',
                  isLastEnabled && 'cursor-not-allowed'
                )}
              >
                <span
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-md border',
                    enabled
                      ? 'border-foreground/20 bg-background/70'
                      : 'border-border/60 bg-muted/40 text-muted-foreground'
                  )}
                >
                  <Icon className="size-3.5" />
                </span>
                <span className="min-w-0 flex-1 space-y-0.5">
                  <Label className="cursor-inherit">
                    {providerId === 'github'
                      ? 'GitHub'
                      : providerId === 'gitlab'
                        ? 'GitLab'
                        : 'Linear'}
                  </Label>
                  <span className="block text-xs text-muted-foreground">
                    {t(`settings.tasks.taskProviders.${providerId}Description`)}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'flex size-4 shrink-0 items-center justify-center rounded border text-[10px]',
                    enabled
                      ? 'border-foreground/50 bg-foreground text-background'
                      : 'border-border bg-background'
                  )}
                >
                  {enabled ? <Check className="size-3" /> : null}
                </span>
              </button>
            )
          })}
        </SearchableSetting>
      </section>
    </div>
  )
}
