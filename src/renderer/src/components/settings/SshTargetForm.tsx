import { FileKey } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  DEFAULT_REMOTE_WORKSPACE_SYNC_GRACE_PERIOD_SECONDS,
  DEFAULT_SSH_RELAY_GRACE_PERIOD_SECONDS,
  MAX_SSH_RELAY_GRACE_PERIOD_SECONDS
} from '../../../../shared/ssh-types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export type EditingTarget = {
  label: string
  configHost: string
  host: string
  port: string
  username: string
  identityFile: string
  proxyCommand: string
  jumpHost: string
  relayGracePeriodSeconds: string
  remoteWorkspaceSyncEnabled: boolean
  remoteWorkspaceSyncGracePeriodSeconds: string
}

export const EMPTY_FORM: EditingTarget = {
  label: '',
  configHost: '',
  host: '',
  port: '22',
  username: '',
  identityFile: '',
  proxyCommand: '',
  jumpHost: '',
  relayGracePeriodSeconds: String(DEFAULT_SSH_RELAY_GRACE_PERIOD_SECONDS),
  remoteWorkspaceSyncEnabled: false,
  remoteWorkspaceSyncGracePeriodSeconds: String(DEFAULT_REMOTE_WORKSPACE_SYNC_GRACE_PERIOD_SECONDS)
}

type SshTargetFormProps = {
  editingId: string | null
  form: EditingTarget
  onFormChange: (updater: (prev: EditingTarget) => EditingTarget) => void
  onSave: () => void
  onCancel: () => void
}

export function SshTargetForm({
  editingId,
  form,
  onFormChange,
  onSave,
  onCancel
}: SshTargetFormProps): React.JSX.Element {
  const { t } = useTranslation()
  return (
    <form
      className="space-y-4 rounded-lg border border-border/50 bg-card/40 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        onSave()
      }}
    >
      <p className="text-sm font-medium">
        {editingId ? t('settings.ssh.editTargetTitle') : t('settings.ssh.newTargetTitle')}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>{t('settings.ssh.label')}</Label>
          <Input
            value={form.label}
            onChange={(e) => onFormChange((f) => ({ ...f, label: e.target.value }))}
            placeholder={t('settings.ssh.labelPlaceholder')}
          />
        </div>
        <div className="space-y-1.5">
          <Label>{t('settings.ssh.host')} *</Label>
          <Input
            value={form.host}
            onChange={(e) => onFormChange((f) => ({ ...f, host: e.target.value }))}
            placeholder={t('settings.ssh.hostPlaceholder')}
          />
        </div>
        <div className="space-y-1.5">
          <Label>{t('settings.ssh.username')} *</Label>
          <Input
            value={form.username}
            onChange={(e) => onFormChange((f) => ({ ...f, username: e.target.value }))}
            placeholder={t('settings.ssh.usernamePlaceholder')}
          />
        </div>
        <div className="space-y-1.5">
          <Label>{t('settings.ssh.port')}</Label>
          <Input
            type="number"
            value={form.port}
            onChange={(e) => onFormChange((f) => ({ ...f, port: e.target.value }))}
            placeholder={t('settings.ssh.portPlaceholder')}
            min={1}
            max={65535}
          />
        </div>
        <div className="col-span-2 space-y-1.5">
          <Label className="flex items-center gap-1.5">
            <FileKey className="size-3.5" />
            {t('settings.ssh.identityFile')}
          </Label>
          <Input
            value={form.identityFile}
            onChange={(e) => onFormChange((f) => ({ ...f, identityFile: e.target.value }))}
            placeholder={t('settings.ssh.identityFilePlaceholder')}
          />
          <p className="text-[11px] text-muted-foreground">
            {t('settings.ssh.identityFileDescription')}
          </p>
        </div>
        <div className="col-span-2 space-y-1.5">
          <Label>{t('settings.ssh.proxyCommand')}</Label>
          <Input
            value={form.proxyCommand}
            onChange={(e) => onFormChange((f) => ({ ...f, proxyCommand: e.target.value }))}
            placeholder={t('settings.ssh.proxyCommandPlaceholder')}
          />
          <p className="text-[11px] text-muted-foreground">
            {t('settings.ssh.proxyCommandDescription')}
          </p>
        </div>
        <div className="col-span-2 space-y-1.5">
          <Label>{t('settings.ssh.jumpHost')}</Label>
          <Input
            value={form.jumpHost}
            onChange={(e) => onFormChange((f) => ({ ...f, jumpHost: e.target.value }))}
            placeholder={t('settings.ssh.jumpHostPlaceholder')}
          />
          <p className="text-[11px] text-muted-foreground">
            {t('settings.ssh.jumpHostDescription')}
          </p>
        </div>
        <div className="col-span-2 space-y-1.5">
          <Label>{t('settings.ssh.relayGracePeriod')}</Label>
          <Input
            type="number"
            value={form.relayGracePeriodSeconds}
            onChange={(e) =>
              onFormChange((f) => ({ ...f, relayGracePeriodSeconds: e.target.value }))
            }
            placeholder={String(DEFAULT_SSH_RELAY_GRACE_PERIOD_SECONDS)}
            min={0}
            max={MAX_SSH_RELAY_GRACE_PERIOD_SECONDS}
          />
          <p className="text-[11px] text-muted-foreground">
            {t('settings.ssh.relayGracePeriodDescription')}
          </p>
        </div>
        <div className="col-span-2 space-y-3 border-t border-border/50 pt-3">
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-0.5 size-4 accent-foreground"
              checked={form.remoteWorkspaceSyncEnabled}
              onChange={(e) =>
                onFormChange((f) => ({ ...f, remoteWorkspaceSyncEnabled: e.target.checked }))
              }
            />
            <span className="space-y-1">
              <span className="block font-medium">{t('settings.ssh.syncRemoteWorkspace')}</span>
              <span className="block text-[11px] text-muted-foreground">
                {t('settings.ssh.syncRemoteWorkspaceDescription')}
              </span>
            </span>
          </label>
          {form.remoteWorkspaceSyncEnabled && (
            <div className="space-y-1.5 pl-7">
              <Label>{t('settings.ssh.syncedRelayGracePeriod')}</Label>
              <Input
                type="number"
                value={form.remoteWorkspaceSyncGracePeriodSeconds}
                onChange={(e) =>
                  onFormChange((f) => ({
                    ...f,
                    remoteWorkspaceSyncGracePeriodSeconds: e.target.value
                  }))
                }
                placeholder="0"
                min={0}
                max={MAX_SSH_RELAY_GRACE_PERIOD_SECONDS}
              />
              <p className="text-[11px] text-muted-foreground">
                {t('settings.ssh.syncedRelayGracePeriodDescription')}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button type="submit" size="sm">
          {editingId ? t('settings.ssh.saveChanges') : t('settings.ssh.addTarget')}
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
      </div>
    </form>
  )
}
