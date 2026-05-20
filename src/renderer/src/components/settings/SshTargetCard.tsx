import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CircleStop,
  Loader2,
  MonitorSmartphone,
  Pencil,
  RotateCcw,
  Server,
  ServerOff,
  Trash2
} from 'lucide-react'
import type {
  SshTarget,
  SshConnectionState,
  SshConnectionStatus
} from '../../../../shared/ssh-types'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { isSshTargetConnecting, type SshTargetBusyAction } from './ssh-target-action-state'

// ── Shared status helpers ────────────────────────────────────────────

// Why: kept in English for external consumers (e.g. SshStatusSegment) that
// have not yet been internationalized. SshTargetCard uses t() directly.
export const STATUS_LABELS: Record<SshConnectionStatus, string> = {
  disconnected: 'Disconnected',
  connecting: 'Connecting\u2026',
  'auth-failed': 'Auth failed',
  'deploying-relay': 'Deploying relay\u2026',
  connected: 'Connected',
  reconnecting: 'Reconnecting\u2026',
  'reconnection-failed': 'Reconnection failed',
  error: 'Error'
}

export function statusColor(status: SshConnectionStatus): string {
  switch (status) {
    case 'connected':
      return 'bg-emerald-500'
    case 'connecting':
    case 'deploying-relay':
    case 'reconnecting':
      return 'bg-yellow-500'
    case 'auth-failed':
    case 'reconnection-failed':
    case 'error':
      return 'bg-red-500'
    default:
      return 'bg-muted-foreground/40'
  }
}

// ── SshTargetCard ────────────────────────────────────────────────────

type SshTargetCardProps = {
  target: SshTarget
  state: SshConnectionState | undefined
  testing: boolean
  busyAction?: SshTargetBusyAction
  onConnect: (targetId: string) => void | Promise<void>
  onDisconnect: (targetId: string) => void | Promise<void>
  onTerminateSessions: (targetId: string) => void | Promise<void>
  onResetRelay: (targetId: string) => void | Promise<void>
  onTest: (targetId: string) => void | Promise<void>
  onEdit: (target: SshTarget) => void
  onRemove: (targetId: string) => void
}

export function SshTargetCard({
  target,
  state,
  testing,
  busyAction,
  onConnect,
  onDisconnect,
  onTerminateSessions,
  onResetRelay,
  onTest,
  onEdit,
  onRemove
}: SshTargetCardProps): React.JSX.Element {
  const { t } = useTranslation()
  const status: SshConnectionStatus = state?.status ?? 'disconnected'
  const [actionInFlight, setActionInFlight] = useState<
    'connect' | 'disconnect' | 'terminate' | 'reset' | null
  >(null)
  const hasActionInFlight = actionInFlight !== null || busyAction !== undefined
  const terminateInFlight = actionInFlight === 'terminate' || busyAction === 'terminate'
  const resetInFlight = actionInFlight === 'reset' || busyAction === 'reset'
  const removeInFlight = busyAction === 'remove'

  const handleConnect = (): void => {
    if (actionInFlight) {
      return
    }
    setActionInFlight('connect')
    Promise.resolve(onConnect(target.id)).finally(() => setActionInFlight(null))
  }

  const handleDisconnect = (): void => {
    if (actionInFlight) {
      return
    }
    setActionInFlight('disconnect')
    Promise.resolve(onDisconnect(target.id)).finally(() => setActionInFlight(null))
  }

  const handleTerminateSessions = (): void => {
    if (actionInFlight) {
      return
    }
    setActionInFlight('terminate')
    Promise.resolve(onTerminateSessions(target.id)).finally(() => setActionInFlight(null))
  }

  const handleResetRelay = (): void => {
    if (actionInFlight) {
      return
    }
    setActionInFlight('reset')
    Promise.resolve(onResetRelay(target.id)).finally(() => setActionInFlight(null))
  }

  const statusLabel = (s: SshConnectionStatus): string => {
    switch (s) {
      case 'disconnected':
        return t('settings.ssh.status.disconnected')
      case 'connecting':
        return t('settings.ssh.status.connecting')
      case 'auth-failed':
        return t('settings.ssh.status.authFailed')
      case 'deploying-relay':
        return t('settings.ssh.status.deployingRelay')
      case 'connected':
        return t('settings.ssh.status.connected')
      case 'reconnecting':
        return t('settings.ssh.status.reconnecting')
      case 'reconnection-failed':
        return t('settings.ssh.status.reconnectionFailed')
      case 'error':
        return t('settings.ssh.status.error')
      default:
        return s
    }
  }

  const renderEndRemoteTerminalsButton = (): React.JSX.Element => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleTerminateSessions}
          className="size-7 text-muted-foreground hover:text-red-400"
          disabled={hasActionInFlight}
          aria-label={
            terminateInFlight
              ? t('settings.ssh.aria.endingRemoteTerminals')
              : t('settings.ssh.aria.endRemoteTerminals')
          }
        >
          {terminateInFlight ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            <CircleStop className="size-3" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={4}>
        {t('settings.ssh.endRemoteTerminals')}
      </TooltipContent>
    </Tooltip>
  )

  const renderResetRelayButton = (): React.JSX.Element => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleResetRelay}
          className="size-7 text-muted-foreground hover:text-red-400"
          disabled={hasActionInFlight}
          aria-label={
            resetInFlight
              ? t('settings.ssh.aria.resettingRemoteRelay')
              : t('settings.ssh.aria.resetRemoteRelay')
          }
        >
          {resetInFlight ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            <RotateCcw className="size-3" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={4}>
        {t('settings.ssh.resetRemoteRelay')}
      </TooltipContent>
    </Tooltip>
  )

  const renderSecondaryIconActions = (includeEndRemoteTerminals: boolean): React.JSX.Element => (
    <div className="flex items-center gap-1">
      {includeEndRemoteTerminals ? renderEndRemoteTerminalsButton() : null}
      {isSshTargetConnecting(status) ? null : renderResetRelayButton()}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(target)}
            className="size-7"
            disabled={hasActionInFlight}
            aria-label={t('settings.ssh.aria.editTarget')}
          >
            <Pencil className="size-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={4}>
          {t('settings.ssh.edit')}
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(target.id)}
            className="size-7 text-muted-foreground hover:text-red-400"
            disabled={hasActionInFlight}
            aria-label={
              removeInFlight
                ? t('settings.ssh.aria.removingTarget')
                : t('settings.ssh.aria.removeTarget')
            }
          >
            {removeInFlight ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <Trash2 className="size-3" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={4}>
          {t('settings.ssh.remove')}
        </TooltipContent>
      </Tooltip>
    </div>
  )

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/40 px-4 py-3">
      <Server className="size-4 shrink-0 text-muted-foreground" />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-medium">{target.label}</span>
          <span className={`size-2 shrink-0 rounded-full ${statusColor(status)}`} />
          <span className="text-[11px] text-muted-foreground">{statusLabel(status)}</span>
        </div>
        <p className="truncate text-xs text-muted-foreground">
          {target.username}@{target.host}:{target.port}
          {target.identityFile ? ` \u2022 ${target.identityFile}` : ''}
        </p>
        {state?.error ? (
          <p className="mt-0.5 truncate text-xs text-red-400">{state.error}</p>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {status === 'connected' ? (
          <>
            {renderSecondaryIconActions(true)}
            <Button
              variant="ghost"
              size="xs"
              onClick={handleDisconnect}
              className="gap-1.5"
              disabled={hasActionInFlight}
            >
              <ServerOff className="size-3" />
              {t('settings.ssh.disconnect')}
            </Button>
          </>
        ) : isSshTargetConnecting(status) ? (
          <>
            {renderSecondaryIconActions(false)}
            <Button variant="ghost" size="xs" disabled className="gap-1.5">
              <Loader2 className="size-3 animate-spin" />
              {t('settings.ssh.connecting')}
            </Button>
          </>
        ) : (
          <>
            {renderSecondaryIconActions(true)}
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onTest(target.id)}
              disabled={testing || hasActionInFlight}
              className="gap-1.5"
            >
              {testing ? (
                <Loader2 className="size-3 animate-spin" />
              ) : (
                <MonitorSmartphone className="size-3" />
              )}
              {t('settings.ssh.test')}
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleConnect}
              className="gap-1.5"
              disabled={hasActionInFlight}
            >
              {actionInFlight === 'connect' ? (
                <Loader2 className="size-3 animate-spin" />
              ) : (
                <Server className="size-3" />
              )}
              {t('settings.ssh.connect')}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
