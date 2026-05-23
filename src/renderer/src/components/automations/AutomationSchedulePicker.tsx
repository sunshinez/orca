import React from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarClock, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import type { AutomationSchedulePreset } from '../../../../shared/automations-types'
import {
  buildAutomationRrule,
  formatAutomationSchedule,
  isValidAutomationSchedule
} from '../../../../shared/automation-schedules'
import type { AutomationDraft } from './AutomationEditorDialog'
import { Field } from './automation-page-parts'

const FIELD_CONTROL_CLASS = 'border-input bg-input/30 shadow-xs dark:bg-input/30'

const DAY_OPTIONS = [
  ['0', 'Sunday'],
  ['1', 'Monday'],
  ['2', 'Tuesday'],
  ['3', 'Wednesday'],
  ['4', 'Thursday'],
  ['5', 'Friday'],
  ['6', 'Saturday']
] as const

function parseTime(value: string): { hour: number; minute: number } {
  const [hour, minute] = value.split(':').map((part) => Number(part))
  return {
    hour: Number.isFinite(hour) ? hour : 9,
    minute: Number.isFinite(minute) ? minute : 0
  }
}

function getDraftScheduleLabel(draft: AutomationDraft, t: (key: string) => string): string {
  if (draft.preset === 'custom') {
    return draft.customSchedule.trim()
      ? formatAutomationSchedule(draft.customSchedule)
      : t('automations.editor.customCron')
  }
  const { hour, minute } = parseTime(draft.time)
  return formatAutomationSchedule(
    buildAutomationRrule({
      preset: draft.preset,
      hour,
      minute,
      dayOfWeek: Number(draft.dayOfWeek)
    })
  )
}

function buildCustomCronFromDraft(draft: AutomationDraft): string {
  const { hour, minute } = parseTime(draft.time)
  if (draft.preset === 'hourly') {
    return `${minute} * * * *`
  }
  if (draft.preset === 'weekdays') {
    return `${minute} ${hour} * * 1-5`
  }
  if (draft.preset === 'weekly') {
    return `${minute} ${hour} * * ${Number(draft.dayOfWeek)}`
  }
  return `${minute} ${hour} * * *`
}

export function AutomationSchedulePicker({
  draft,
  triggerClassName,
  onDraftChange
}: {
  draft: AutomationDraft
  triggerClassName?: string
  onDraftChange: (updater: (current: AutomationDraft) => AutomationDraft) => void
}): React.JSX.Element {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)
  const label = getDraftScheduleLabel(draft, t)
  const customSchedule = draft.customSchedule.trim()
  const customScheduleInvalid =
    draft.preset === 'custom' &&
    customSchedule.length > 0 &&
    !isValidAutomationSchedule(customSchedule)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('h-9 w-full justify-between px-3 text-sm font-normal', triggerClassName)}
        >
          <span className="flex min-w-0 items-center gap-2">
            <CalendarClock className="size-4 text-muted-foreground" />
            <span className="truncate">{label}</span>
          </span>
          <ChevronsUpDown className="size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] min-w-[19rem] p-3"
      >
        <div className="grid gap-3">
          <Field label={t('automations.editor.scheduleLabel')}>
            <Select
              value={draft.preset}
              onValueChange={(preset) =>
                onDraftChange((current) => ({
                  ...current,
                  preset: preset as AutomationSchedulePreset,
                  customSchedule:
                    preset === 'custom' && !current.customSchedule.trim()
                      ? buildCustomCronFromDraft(current)
                      : current.customSchedule,
                  scheduleWarning: null
                }))
              }
            >
              <SelectTrigger className={`w-full ${FIELD_CONTROL_CLASS}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">{t('automations.editor.hourly')}</SelectItem>
                <SelectItem value="daily">{t('automations.editor.daily')}</SelectItem>
                <SelectItem value="weekdays">{t('automations.editor.weekdays')}</SelectItem>
                <SelectItem value="weekly">{t('automations.editor.weekly')}</SelectItem>
                <SelectItem value="custom">{t('automations.editor.customCron')}</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          {draft.preset !== 'custom' ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="justify-start"
              onClick={() =>
                onDraftChange((current) => ({
                  ...current,
                  preset: 'custom',
                  customSchedule:
                    current.customSchedule.trim() || buildCustomCronFromDraft(current),
                  scheduleWarning: null
                }))
              }
            >
              {t('automations.editor.useCustomCron')}
            </Button>
          ) : null}
          {draft.preset === 'custom' ? (
            <Field label={t('automations.editor.cronStringLabel')}>
              <Input
                value={draft.customSchedule}
                placeholder="0 9 * * 1-5"
                spellCheck={false}
                className={`font-mono ${FIELD_CONTROL_CLASS}`}
                aria-invalid={customScheduleInvalid}
                onChange={(event) =>
                  onDraftChange((current) => ({
                    ...current,
                    customSchedule: event.target.value,
                    scheduleWarning: null
                  }))
                }
              />
              <div className="mt-1 text-[11px] text-muted-foreground">
                {t('automations.editor.cronStringHelp')}
              </div>
              {customScheduleInvalid ? (
                <div className="mt-1 text-[11px] text-destructive">
                  {t('automations.editor.cronStringError')}
                </div>
              ) : null}
            </Field>
          ) : null}
          {draft.preset === 'weekly' ? (
            <Field label={t('automations.editor.dayLabel')}>
              <Select
                value={draft.dayOfWeek}
                onValueChange={(dayOfWeek) =>
                  onDraftChange((current) => ({ ...current, dayOfWeek, scheduleWarning: null }))
                }
              >
                <SelectTrigger className={`w-full ${FIELD_CONTROL_CLASS}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DAY_OPTIONS.map(([value, labelKey]) => (
                    <SelectItem key={value} value={value}>
                      {t(`automations.editor.${labelKey.toLowerCase()}` as never)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          ) : null}
          {draft.preset !== 'custom' ? (
            <Field
              label={
                draft.preset === 'hourly'
                  ? t('automations.editor.minuteLabel')
                  : t('automations.editor.timeLabel')
              }
            >
              <Input
                type="time"
                value={draft.time}
                className={FIELD_CONTROL_CLASS}
                onChange={(event) =>
                  onDraftChange((current) => ({
                    ...current,
                    time: event.target.value,
                    scheduleWarning: null
                  }))
                }
              />
            </Field>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  )
}
