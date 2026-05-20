import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Plus, Upload } from 'lucide-react'
import {
  DEFAULT_REMOTE_WORKSPACE_SYNC_GRACE_PERIOD_SECONDS,
  DEFAULT_SSH_RELAY_GRACE_PERIOD_SECONDS,
  MAX_SSH_RELAY_GRACE_PERIOD_SECONDS,
  MIN_SSH_RELAY_GRACE_PERIOD_SECONDS,
  type SshTarget
} from '../../../../shared/ssh-types'
import { SSH_TERMINATE_RECONNECT_REQUIRED } from '../../../../shared/constants'
import { useAppStore } from '@/store'
import { Button } from '../ui/button'
import type { SettingsSearchEntry } from './settings-search'
import { SshTargetCard } from './SshTargetCard'
import { SshTargetDestructiveActions } from './SshTargetDestructiveActions'
import { SshTargetForm, EMPTY_FORM, type EditingTarget } from './SshTargetForm'

export const SSH_PANE_SEARCH_ENTRIES: SettingsSearchEntry[] = [
  {
    title: 'SSH Connections',
    description: 'Manage remote SSH targets.',
    keywords: ['ssh', 'remote', 'server', 'connection', 'host']
  },
  {
    title: 'Add SSH Target',
    description: 'Add a new remote SSH target.',
    keywords: ['ssh', 'add', 'new', 'target', 'host', 'server']
  },
  {
    title: 'Import from SSH Config',
    description: 'Import hosts from ~/.ssh/config.',
    keywords: ['ssh', 'import', 'config', 'hosts']
  },
  {
    title: 'Test Connection',
    description: 'Test connectivity to an SSH target.',
    keywords: ['ssh', 'test', 'connection', 'ping']
  }
]

type SshPaneProps = Record<string, never>

export function SshPane(_props: SshPaneProps): React.JSX.Element {
  const { t } = useTranslation()
  const [targets, setTargets] = useState<SshTarget[]>([])
  // Why: connection states are already hydrated and kept up-to-date by the
  // global store (via useIpcEvents.ts). Reading from the store avoids
  // duplicating the onStateChanged listener and per-target getState IPC calls.
  const sshConnectionStates = useAppStore((s) => s.sshConnectionStates)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<EditingTarget>(EMPTY_FORM)
  const [testingIds, setTestingIds] = useState<Set<string>>(new Set())

  const setSshTargetsMetadata = useAppStore((s) => s.setSshTargetsMetadata)

  const loadTargets = useCallback(
    async (opts?: { signal?: AbortSignal }) => {
      try {
        const result = (await window.api.ssh.listTargets()) as SshTarget[]
        if (opts?.signal?.aborted) {
          return
        }
        setTargets(result)
        setSshTargetsMetadata(result)
      } catch {
        if (!opts?.signal?.aborted) {
          toast.error(t('settings.ssh.toast.loadFailed'))
        }
      }
    },
    [setSshTargetsMetadata, t]
  )

  useEffect(() => {
    const abortController = new AbortController()
    void loadTargets({ signal: abortController.signal })
    return () => abortController.abort()
  }, [loadTargets])

  const handleSave = async (): Promise<void> => {
    if (!form.host.trim() || !form.username.trim()) {
      toast.error(t('settings.ssh.toast.hostAndUsernameRequired'))
      return
    }

    const port = parseInt(form.port, 10)
    if (isNaN(port) || port < 1 || port > 65535) {
      toast.error(t('settings.ssh.toast.portInvalid'))
      return
    }

    const graceSeconds = parseInt(form.relayGracePeriodSeconds, 10)
    if (
      isNaN(graceSeconds) ||
      (graceSeconds !== 0 && graceSeconds < MIN_SSH_RELAY_GRACE_PERIOD_SECONDS) ||
      graceSeconds > MAX_SSH_RELAY_GRACE_PERIOD_SECONDS
    ) {
      toast.error(t('settings.ssh.toast.relayGracePeriodInvalid'))
      return
    }
    const remoteGraceSeconds = parseInt(form.remoteWorkspaceSyncGracePeriodSeconds, 10)
    if (
      form.remoteWorkspaceSyncEnabled &&
      (isNaN(remoteGraceSeconds) ||
        remoteGraceSeconds < 0 ||
        remoteGraceSeconds > MAX_SSH_RELAY_GRACE_PERIOD_SECONDS)
    ) {
      toast.error(t('settings.ssh.toast.syncedRelayGracePeriodInvalid'))
      return
    }

    const target = {
      label: form.label.trim() || `${form.username}@${form.host}`,
      configHost: form.configHost.trim() || form.host.trim(),
      host: form.host.trim(),
      port,
      username: form.username.trim(),
      relayGracePeriodSeconds: graceSeconds,
      remoteWorkspaceSyncEnabled: form.remoteWorkspaceSyncEnabled,
      remoteWorkspaceSyncGracePeriodSeconds: form.remoteWorkspaceSyncEnabled
        ? remoteGraceSeconds
        : DEFAULT_REMOTE_WORKSPACE_SYNC_GRACE_PERIOD_SECONDS,
      ...(form.identityFile.trim() ? { identityFile: form.identityFile.trim() } : {}),
      ...(form.proxyCommand.trim() ? { proxyCommand: form.proxyCommand.trim() } : {}),
      ...(form.jumpHost.trim() ? { jumpHost: form.jumpHost.trim() } : {})
    }

    try {
      if (editingId) {
        await window.api.ssh.updateTarget({ id: editingId, updates: target })
        toast.success(t('settings.ssh.toast.targetUpdated'))
      } else {
        await window.api.ssh.addTarget({ target })
        toast.success(t('settings.ssh.toast.targetAdded'))
      }
      setShowForm(false)
      setEditingId(null)
      setForm(EMPTY_FORM)
      await loadTargets()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('settings.ssh.toast.saveFailed'))
    }
  }

  const terminateSessionsWithReconnect = async (targetId: string): Promise<void> => {
    try {
      await window.api.ssh.terminateSessions({ targetId })
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      if (!message.includes(SSH_TERMINATE_RECONNECT_REQUIRED)) {
        throw err
      }
      // Why: disconnect is now non-destructive, so preserved remote PTYs may
      // require a fresh relay attachment before they can be explicitly killed.
      await window.api.ssh.connect({ targetId })
      await window.api.ssh.terminateSessions({ targetId })
    }
  }

  const handleRemove = async (id: string): Promise<void> => {
    try {
      // Why: removing a target is destructive even after non-destructive
      // disconnect, when remote PTYs can still be alive in the grace window.
      await terminateSessionsWithReconnect(id)
      await window.api.ssh.removeTarget({ id })
      toast.success(t('settings.ssh.toast.targetRemoved'))
      await loadTargets()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('settings.ssh.toast.removeFailed'))
    }
  }

  const handleEdit = (target: SshTarget): void => {
    setEditingId(target.id)
    setForm({
      label: target.label,
      configHost: target.configHost ?? target.host,
      host: target.host,
      port: String(target.port),
      username: target.username,
      identityFile: target.identityFile ?? '',
      proxyCommand: target.proxyCommand ?? '',
      jumpHost: target.jumpHost ?? '',
      relayGracePeriodSeconds: String(
        target.relayGracePeriodSeconds ?? DEFAULT_SSH_RELAY_GRACE_PERIOD_SECONDS
      ),
      remoteWorkspaceSyncEnabled: target.remoteWorkspaceSyncEnabled === true,
      remoteWorkspaceSyncGracePeriodSeconds: String(
        target.remoteWorkspaceSyncGracePeriodSeconds ??
          DEFAULT_REMOTE_WORKSPACE_SYNC_GRACE_PERIOD_SECONDS
      )
    })
    setShowForm(true)
  }

  const handleConnect = async (targetId: string): Promise<void> => {
    try {
      await window.api.ssh.connect({ targetId })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('settings.ssh.toast.connectionFailed'))
    }
  }

  const handleDisconnect = async (targetId: string): Promise<void> => {
    try {
      await window.api.ssh.disconnect({ targetId })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('settings.ssh.toast.disconnectFailed'))
    }
  }

  const handleTerminateSessions = async (targetId: string): Promise<void> => {
    try {
      await terminateSessionsWithReconnect(targetId)
      toast.success(t('settings.ssh.toast.remoteTerminalsEnded'))
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : t('settings.ssh.toast.endRemoteTerminalsFailed')
      )
    }
  }

  const handleResetRelay = async (targetId: string): Promise<void> => {
    try {
      await window.api.ssh.resetRelay({ targetId })
      toast.success(t('settings.ssh.toast.remoteRelayReset'))
      await loadTargets()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('settings.ssh.toast.resetRelayFailed'))
    }
  }

  const handleTest = async (targetId: string): Promise<void> => {
    setTestingIds((prev) => new Set(prev).add(targetId))
    try {
      const result = await window.api.ssh.testConnection({ targetId })
      if (result.success) {
        toast.success(t('settings.ssh.toast.connectionSuccessful'))
      } else {
        toast.error(result.error ?? t('settings.ssh.toast.connectionTestFailed'))
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('settings.ssh.toast.testFailed'))
    } finally {
      setTestingIds((prev) => {
        const next = new Set(prev)
        next.delete(targetId)
        return next
      })
    }
  }

  const handleImport = async (): Promise<void> => {
    try {
      const imported = (await window.api.ssh.importConfig()) as SshTarget[]
      if (imported.length === 0) {
        toast(t('settings.ssh.toast.noNewHosts'))
      } else {
        toast.success(
          imported.length === 1
            ? t('settings.ssh.toast.importedHost', { count: imported.length })
            : t('settings.ssh.toast.importedHosts', { count: imported.length })
        )
      }
      await loadTargets()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('settings.ssh.toast.importFailed'))
    }
  }

  const cancelForm = (): void => {
    setShowForm(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <p className="text-sm font-medium">{t('settings.ssh.targetsTitle')}</p>
          <p className="text-xs text-muted-foreground">{t('settings.ssh.targetsDescription')}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <Button
            variant="outline"
            size="xs"
            onClick={() => void handleImport()}
            className="gap-1.5"
          >
            <Upload className="size-3" />
            {t('settings.ssh.import')}
          </Button>
          {!showForm ? (
            <Button
              variant="outline"
              size="xs"
              onClick={() => {
                setEditingId(null)
                setForm(EMPTY_FORM)
                setShowForm(true)
              }}
              className="gap-1.5"
            >
              <Plus className="size-3" />
              {t('settings.ssh.addTarget')}
            </Button>
          ) : null}
        </div>
      </div>

      <SshTargetDestructiveActions
        connectionStates={sshConnectionStates}
        onRemove={handleRemove}
        onResetRelay={handleResetRelay}
        onTerminateSessions={handleTerminateSessions}
      >
        {({ busyActionForTarget, requestRemove, requestResetRelay, requestTerminateSessions }) => (
          <>
            {/* Target list */}
            {targets.length === 0 && !showForm ? (
              <div className="flex items-center justify-center rounded-lg border border-dashed border-border/60 bg-card/30 px-4 py-5 text-sm text-muted-foreground">
                {t('settings.ssh.noTargetsConfigured')}
              </div>
            ) : (
              <div className="space-y-2">
                {targets.map((target) => (
                  <SshTargetCard
                    key={target.id}
                    target={target}
                    state={sshConnectionStates.get(target.id)}
                    testing={testingIds.has(target.id)}
                    busyAction={busyActionForTarget(target.id)}
                    onConnect={handleConnect}
                    onDisconnect={handleDisconnect}
                    onTerminateSessions={(id) =>
                      requestTerminateSessions({ id, label: target.label })
                    }
                    onResetRelay={(id) => requestResetRelay({ id, label: target.label })}
                    onTest={handleTest}
                    onEdit={handleEdit}
                    onRemove={(id) => requestRemove({ id, label: target.label })}
                  />
                ))}
              </div>
            )}

            {/* Add/Edit form */}
            {showForm ? (
              <SshTargetForm
                editingId={editingId}
                form={form}
                onFormChange={setForm}
                onSave={() => void handleSave()}
                onCancel={cancelForm}
              />
            ) : null}
          </>
        )}
      </SshTargetDestructiveActions>
    </div>
  )
}
