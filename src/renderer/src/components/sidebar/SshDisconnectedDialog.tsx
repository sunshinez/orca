import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Loader2, Server, ServerOff } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { statusColor } from '@/components/settings/SshTargetCard'
import type { SshConnectionStatus } from '../../../../shared/ssh-types'

type SshDisconnectedDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  targetId: string
  targetLabel: string
  status: SshConnectionStatus
}

function getStatusMessage(status: SshConnectionStatus, t: (key: string) => string): string {
  const messages: Partial<Record<SshConnectionStatus, string>> = {
    disconnected: t('sidebar.sshDisconnected.statusMessages.disconnected'),
    reconnecting: t('sidebar.sshDisconnected.statusMessages.reconnecting'),
    'reconnection-failed': t('sidebar.sshDisconnected.statusMessages.reconnectionFailed'),
    error: t('sidebar.sshDisconnected.statusMessages.error'),
    'auth-failed': t('sidebar.sshDisconnected.statusMessages.authFailed')
  }
  return messages[status] ?? t('sidebar.sshDisconnected.statusMessages.disconnected')
}

function isReconnectable(status: SshConnectionStatus): boolean {
  return ['disconnected', 'reconnection-failed', 'error', 'auth-failed'].includes(status)
}

export function SshDisconnectedDialog({
  open,
  onOpenChange,
  targetId,
  targetLabel,
  status
}: SshDisconnectedDialogProps): React.JSX.Element {
  const { t } = useTranslation()
  const [connecting, setConnecting] = useState(false)

  const handleReconnect = useCallback(async () => {
    setConnecting(true)
    try {
      await window.api.ssh.connect({ targetId })
      onOpenChange(false)
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : t('sidebar.sshDisconnected.reconnectionFailed')
      )
    } finally {
      setConnecting(false)
    }
  }, [targetId, onOpenChange, t])

  const isConnecting =
    connecting ||
    status === 'connecting' ||
    status === 'deploying-relay' ||
    status === 'reconnecting'
  const message = isConnecting
    ? t('sidebar.sshDisconnected.reconnectingMessage')
    : getStatusMessage(status, t)
  const showReconnect = isReconnectable(status)

  useEffect(() => {
    // Window-level Enter handler. The dialog typically appears while focus
    // is inside an embedded terminal (xterm) or editor (monaco) that
    // aggressively reclaims focus, so dialog-scoped key handlers never
    // fire. Listening on window (capture phase) catches Enter regardless
    // of where focus actually lives while the dialog is open.
    if (!open || !showReconnect || isConnecting) {
      return undefined
    }
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Enter' || event.defaultPrevented) {
        return
      }
      if (event.isComposing) {
        return
      }
      event.preventDefault()
      event.stopPropagation()
      void handleReconnect()
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [open, showReconnect, isConnecting, handleReconnect])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm gap-3 p-5" showCloseButton={false}>
        <DialogHeader className="gap-1">
          <DialogTitle className="flex items-center gap-2 text-sm font-semibold">
            {isConnecting ? (
              <Loader2 className="size-4 text-yellow-500 animate-spin" />
            ) : (
              <ServerOff className="size-4 text-muted-foreground" />
            )}
            {isConnecting
              ? t('sidebar.sshDisconnected.titleReconnecting')
              : t('sidebar.sshDisconnected.titleDisconnected')}
          </DialogTitle>
          <DialogDescription className="text-xs">{message}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2.5 rounded-md border border-border/50 bg-card/40 px-3 py-2">
          <Server className="size-3.5 shrink-0 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <span className="text-xs font-medium">{targetLabel}</span>
          </div>
          {isConnecting ? (
            <Loader2 className="size-3.5 shrink-0 text-yellow-500 animate-spin" />
          ) : (
            <span className={`size-1.5 shrink-0 rounded-full ${statusColor(status)}`} />
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isConnecting}
          >
            {t('sidebar.sshDisconnected.dismiss')}
          </Button>
          {showReconnect && (
            <Button size="sm" onClick={() => void handleReconnect()} disabled={isConnecting}>
              {isConnecting ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  {t('sidebar.sshDisconnected.connecting')}
                </>
              ) : (
                t('sidebar.sshDisconnected.reconnect')
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
