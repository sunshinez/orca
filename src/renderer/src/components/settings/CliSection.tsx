import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { Copy, FolderOpen, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import type { CliInstallStatus } from '../../../../shared/cli-install-types'
import { ORCA_CLI_SKILL_INSTALL_COMMAND } from '@/lib/agent-feature-install-commands'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import { Label } from '../ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

type CliSectionProps = {
  currentPlatform: string
}

function getRevealLabel(platform: string, t: TFunction): string {
  if (platform === 'darwin') {
    return t('settings.cli.revealLabelDarwin')
  }
  if (platform === 'win32') {
    return t('settings.cli.revealLabelWin32')
  }
  return t('settings.cli.revealLabelDefault')
}

function getInstallDescription(platform: string, t: TFunction): string {
  if (platform === 'darwin') {
    return t('settings.cli.installDescriptionDarwin')
  }
  if (platform === 'linux') {
    return t('settings.cli.installDescriptionLinux')
  }
  if (platform === 'win32') {
    return t('settings.cli.installDescriptionWin32')
  }
  return t('settings.cli.installDescriptionUnsupported')
}

export function CliSection({ currentPlatform }: CliSectionProps): React.JSX.Element {
  const { t } = useTranslation()
  const [status, setStatus] = useState<CliInstallStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [busyAction, setBusyAction] = useState<'install' | 'remove' | null>(null)

  const refreshStatus = useCallback(async (): Promise<void> => {
    setLoading(true)
    try {
      setStatus(await window.api.cli.getInstallStatus())
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('settings.cli.toast.loadStatusFailed'))
    } finally {
      setLoading(false)
    }
  }, [t])

  useEffect(() => {
    void refreshStatus()
  }, [refreshStatus])

  const isEnabled = status?.state === 'installed'
  const isSupported = status?.supported ?? false
  const isBrowserManaged = status?.unsupportedReason === 'launch_mode_unavailable'
  const revealLabel = getRevealLabel(currentPlatform, t)
  const canRevealCommandPath =
    status?.commandPath != null && ['installed', 'stale', 'conflict'].includes(status.state)

  const handleInstall = async (): Promise<void> => {
    setBusyAction('install')
    try {
      const next = await window.api.cli.install()
      setStatus(next)
      setDialogOpen(false)
      toast.success(t('settings.cli.toast.registered'))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('settings.cli.toast.registerFailed'))
    } finally {
      setBusyAction(null)
    }
  }

  const handleRemove = async (): Promise<void> => {
    setBusyAction('remove')
    try {
      const next = await window.api.cli.remove()
      setStatus(next)
      setDialogOpen(false)
      toast.success(t('settings.cli.toast.removed'))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('settings.cli.toast.removeFailed'))
    } finally {
      setBusyAction(null)
    }
  }

  const handleCopySkillInstallCommand = async (command: string): Promise<void> => {
    try {
      await window.api.ui.writeClipboardText(command)
      toast.success(t('settings.cli.toast.copySkillCommandSuccess'))
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t('settings.cli.toast.copySkillCommandFailed')
      )
    }
  }

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">{t('settings.cli.title')}</h2>
        <p className="text-xs text-muted-foreground">{t('settings.cli.description')}</p>
      </div>

      <div className="space-y-3 rounded-xl border border-border/60 bg-card/50 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <Label>{t('settings.cli.shellCommandLabel')}</Label>
            <p className="text-xs text-muted-foreground">
              {loading
                ? t('settings.cli.checkingStatus')
                : (status?.detail ?? getInstallDescription(currentPlatform, t))}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider delayDuration={250}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => void refreshStatus()}
                    disabled={loading || busyAction !== null}
                    aria-label={t('settings.cli.refreshAriaLabel')}
                  >
                    <RefreshCw className="size-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={6}>
                  {t('settings.cli.refreshTooltip')}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {!isBrowserManaged ? (
              <button
                role="switch"
                aria-checked={isEnabled}
                disabled={loading || !isSupported || busyAction !== null}
                onClick={() => setDialogOpen(true)}
                className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-transparent transition-colors ${
                  isEnabled ? 'bg-foreground' : 'bg-muted-foreground/30'
                } ${loading || !isSupported || busyAction !== null ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              >
                <span
                  className={`pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform ${
                    isEnabled ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
            ) : null}
          </div>
        </div>

        {status?.commandPath ? (
          <p className="text-xs text-muted-foreground">
            {t('settings.cli.commandPathLabel')}{' '}
            <code className="rounded bg-muted px-1 py-0.5 text-[11px]">{status.commandPath}</code>
          </p>
        ) : null}

        {status?.state === 'stale' && status.currentTarget ? (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            {t('settings.cli.existingLauncherTarget')} <code>{status.currentTarget}</code>
          </p>
        ) : null}

        {status?.state === 'installed' && !status.pathConfigured && status.pathDirectory ? (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            {t('settings.cli.pathNotVisible', { path: status.pathDirectory })}
          </p>
        ) : null}

        {!loading && !isSupported && !isBrowserManaged && status?.detail ? (
          <p className="text-xs text-muted-foreground">{status.detail}</p>
        ) : null}

        <div className="flex items-center gap-2">
          {status?.commandPath ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => void window.api.shell.openPath(status.commandPath as string)}
              disabled={loading || !canRevealCommandPath}
              className="gap-2"
            >
              <FolderOpen className="size-3.5" />
              {revealLabel}
            </Button>
          ) : null}
        </div>

        {!isBrowserManaged ? (
          <div className="border-t border-border/60 pt-3">
            <div className="space-y-0.5">
              <Label>{t('settings.cli.agentSkillsLabel')}</Label>
              <p className="text-xs text-muted-foreground">
                {t('settings.cli.agentSkillsDescription')}
              </p>
            </div>

            <div className="mt-3 space-y-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{t('settings.cli.cliSkillLabel')}</p>
                <div className="inline-flex max-w-full items-center gap-2 rounded-lg border border-border/60 bg-background/60 px-3 py-2">
                  <code className="overflow-x-auto whitespace-nowrap text-[11px] text-muted-foreground">
                    {ORCA_CLI_SKILL_INSTALL_COMMAND}
                  </code>
                  <TooltipProvider delayDuration={250}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() =>
                            void handleCopySkillInstallCommand(ORCA_CLI_SKILL_INSTALL_COMMAND)
                          }
                          aria-label={t('settings.cli.copySkillInstallCommandAriaLabel')}
                        >
                          <Copy className="size-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" sideOffset={6}>
                        {t('settings.cli.copyTooltip')}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEnabled
                ? t('settings.cli.dialog.removeTitle')
                : t('settings.cli.dialog.registerTitle')}
            </DialogTitle>
            <DialogDescription>
              {isEnabled
                ? t('settings.cli.dialog.removeDescription')
                : t('settings.cli.dialog.registerDescription', {
                    commandPath: status?.commandPath ?? '`orca`'
                  })}
            </DialogDescription>
          </DialogHeader>
          {status?.commandPath ? (
            <p className="text-xs text-muted-foreground">
              {t('settings.cli.dialog.targetPathLabel')}{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-[11px]">{status.commandPath}</code>
            </p>
          ) : null}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={busyAction !== null}
            >
              {t('common.cancel')}
            </Button>
            <Button
              onClick={() => void (isEnabled ? handleRemove() : handleInstall())}
              disabled={busyAction !== null || !isSupported}
            >
              {busyAction === 'remove'
                ? t('settings.cli.dialog.removing')
                : busyAction === 'install'
                  ? t('settings.cli.dialog.registering')
                  : isEnabled
                    ? t('settings.cli.dialog.remove')
                    : t('settings.cli.dialog.register')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
