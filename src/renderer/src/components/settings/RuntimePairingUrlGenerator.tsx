import { Check, Copy, Loader2, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import type { RuntimeAccessGrant } from '../../../../shared/runtime-access-grants'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { RuntimeAccessGrantList } from './RuntimeAccessGrantList'

const LOOPBACK_ADDRESS = '127.0.0.1'

// Why: runtime pairing tokens stay valid in the main-process registry; keep the
// last displayed URL across settings collapse/navigation without less-protected storage.
const runtimePairingUrlCache: {
  selectedAddress: string
  customAddress: string
  runtimePairingUrl: string | null
  webClientUrl: string | null
  runtimePairingDeviceId: string | null
} = {
  selectedAddress: LOOPBACK_ADDRESS,
  customAddress: '',
  runtimePairingUrl: null,
  webClientUrl: null,
  runtimePairingDeviceId: null
}

function GeneratedUrlRow({
  label,
  description,
  value,
  copied,
  onCopy
}: {
  label: string
  description?: string
  value: string
  copied: boolean
  onCopy: () => void
}): React.JSX.Element {
  const { t } = useTranslation()
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      <div className="flex min-w-0 items-center gap-2 rounded-md border border-border/60 bg-background/70 px-2 py-1.5">
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-[11px] text-muted-foreground">
          {value}
        </code>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={onCopy}
          aria-label={t('settings.runtimePairing.copyAria', { label })}
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </Button>
      </div>
    </div>
  )
}

function UnavailableUrlRow({
  label,
  description
}: {
  label: string
  description: string
}): React.JSX.Element {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <div className="rounded-md border border-border/60 px-2 py-1.5">
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

type RuntimePairingUrlGeneratorProps = {
  framed?: boolean
  showHeader?: boolean
  showGeneratorForm?: boolean
}

export function RuntimePairingUrlGenerator({
  framed = true,
  showHeader = true,
  showGeneratorForm = true
}: RuntimePairingUrlGeneratorProps): React.JSX.Element {
  const { t } = useTranslation()
  const [networkInterfaces, setNetworkInterfaces] = useState<{ name: string; address: string }[]>(
    []
  )
  const [selectedAddress, setSelectedAddress] = useState(runtimePairingUrlCache.selectedAddress)
  const [customAddress, setCustomAddress] = useState(runtimePairingUrlCache.customAddress)
  const [runtimePairingUrl, setRuntimePairingUrl] = useState<string | null>(
    runtimePairingUrlCache.runtimePairingUrl
  )
  const [webClientUrl, setWebClientUrl] = useState<string | null>(
    runtimePairingUrlCache.webClientUrl
  )
  const [runtimePairingDeviceId, setRuntimePairingDeviceId] = useState<string | null>(
    runtimePairingUrlCache.runtimePairingDeviceId
  )
  const [runtimeAccessGrants, setRuntimeAccessGrants] = useState<RuntimeAccessGrant[]>([])
  const [isLoadingAccessGrants, setIsLoadingAccessGrants] = useState(false)
  const [refreshingNetworkInterfaces, setRefreshingNetworkInterfaces] = useState(false)
  const [revokingGrantId, setRevokingGrantId] = useState<string | null>(null)
  const [copiedTarget, setCopiedTarget] = useState<'web' | 'pairing' | null>(null)
  const [isGeneratingPairing, setIsGeneratingPairing] = useState(false)
  const networkInterfaceLoadIdRef = useRef(0)
  const accessGrantLoadIdRef = useRef(0)

  const loadRuntimeAccessGrants = useCallback(
    async (options: { showToastOnError?: boolean } = {}): Promise<void> => {
      const loadId = accessGrantLoadIdRef.current + 1
      accessGrantLoadIdRef.current = loadId
      setIsLoadingAccessGrants(true)
      try {
        const result = await window.api.mobile.listRuntimeAccessGrants()
        if (loadId === accessGrantLoadIdRef.current) {
          setRuntimeAccessGrants(result.grants)
        }
      } catch (error) {
        if (loadId === accessGrantLoadIdRef.current && options.showToastOnError) {
          toast.error(
            error instanceof Error
              ? error.message
              : t('settings.runtimePairing.toast.loadGrantsFailed')
          )
        }
      } finally {
        if (loadId === accessGrantLoadIdRef.current) {
          setIsLoadingAccessGrants(false)
        }
      }
    },
    [t]
  )

  const loadNetworkInterfaces = useCallback(
    async (options: { showToastOnError?: boolean } = {}): Promise<void> => {
      const loadId = networkInterfaceLoadIdRef.current + 1
      networkInterfaceLoadIdRef.current = loadId
      setRefreshingNetworkInterfaces(true)
      try {
        const result = await window.api.mobile.listNetworkInterfaces()
        if (loadId === networkInterfaceLoadIdRef.current) {
          setNetworkInterfaces(result.interfaces)
        }
      } catch {
        if (loadId === networkInterfaceLoadIdRef.current && options.showToastOnError) {
          toast.error(t('settings.runtimePairing.toast.refreshFailed'))
        }
      } finally {
        if (loadId === networkInterfaceLoadIdRef.current) {
          setRefreshingNetworkInterfaces(false)
        }
      }
    },
    [t]
  )

  useEffect(() => {
    void loadNetworkInterfaces()
    return () => {
      networkInterfaceLoadIdRef.current += 1
    }
  }, [loadNetworkInterfaces])

  useEffect(() => {
    void loadRuntimeAccessGrants()
    return () => {
      accessGrantLoadIdRef.current += 1
    }
  }, [loadRuntimeAccessGrants])

  const clearGeneratedUrls = (): void => {
    runtimePairingUrlCache.runtimePairingUrl = null
    runtimePairingUrlCache.webClientUrl = null
    runtimePairingUrlCache.runtimePairingDeviceId = null
    setRuntimePairingUrl(null)
    setWebClientUrl(null)
    setRuntimePairingDeviceId(null)
  }

  const generateRuntimePairingUrl = async (): Promise<void> => {
    setIsGeneratingPairing(true)
    try {
      const advertiseAddress = customAddress.trim() || selectedAddress
      const result = await window.api.mobile.getRuntimePairingUrl({
        address: advertiseAddress,
        rotate: true
      })
      if (!result.available) {
        clearGeneratedUrls()
        toast.error(t('settings.runtimePairing.toast.unavailable'))
        return
      }
      runtimePairingUrlCache.runtimePairingUrl = result.pairingUrl
      runtimePairingUrlCache.webClientUrl = result.webClientUrl
      runtimePairingUrlCache.runtimePairingDeviceId = result.deviceId
      setRuntimePairingUrl(result.pairingUrl)
      setWebClientUrl(result.webClientUrl)
      setRuntimePairingDeviceId(result.deviceId)
      await loadRuntimeAccessGrants()
      toast.success(
        result.webClientUrl
          ? t('settings.runtimePairing.toast.generatedWebClient')
          : t('settings.runtimePairing.toast.generatedPairing')
      )
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t('settings.runtimePairing.toast.generateFailed')
      )
    } finally {
      setIsGeneratingPairing(false)
    }
  }

  const revokeRuntimeAccess = async (grant: RuntimeAccessGrant): Promise<void> => {
    setRevokingGrantId(grant.deviceId)
    try {
      const result = await window.api.mobile.revokeRuntimeAccess({ deviceId: grant.deviceId })
      if (!result.revoked) {
        toast.error(t('settings.runtimePairing.toast.alreadyRevoked'))
        await loadRuntimeAccessGrants()
        return
      }
      setRuntimeAccessGrants((current) =>
        current.filter((entry) => entry.deviceId !== grant.deviceId)
      )
      if (runtimePairingDeviceId === grant.deviceId) {
        clearGeneratedUrls()
      }
      toast.success(t('settings.runtimePairing.toast.revoked'))
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t('settings.runtimePairing.toast.revokeFailed')
      )
    } finally {
      setRevokingGrantId(null)
    }
  }

  const copyGeneratedUrl = async (target: 'web' | 'pairing', value: string): Promise<void> => {
    try {
      await window.api.ui.writeClipboardText(value)
      setCopiedTarget(target)
      toast.success(
        target === 'web'
          ? t('settings.runtimePairing.toast.copiedWebClient')
          : t('settings.runtimePairing.toast.copiedPairing')
      )
      window.setTimeout(() => {
        setCopiedTarget((current) => (current === target ? null : current))
      }, 1400)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t('settings.runtimePairing.toast.copyFailed')
      )
    }
  }

  const containerClassName = framed
    ? 'space-y-3 rounded-lg border border-border/50 bg-muted/25 p-3'
    : 'space-y-4'
  const sharedAccessClassName = showGeneratorForm ? 'border-t border-border/40 pt-3' : ''

  const updateSelectedAddress = (address: string): void => {
    runtimePairingUrlCache.selectedAddress = address
    setSelectedAddress(address)
  }

  const updateCustomAddress = (address: string): void => {
    runtimePairingUrlCache.customAddress = address
    setCustomAddress(address)
  }

  return (
    <div className={containerClassName}>
      {showHeader ? (
        <div className="space-y-1">
          <Label id="runtime-share-server-label">{t('settings.runtimePairing.title')}</Label>
          <p className="text-xs text-muted-foreground">
            {t('settings.runtimePairing.description')}
          </p>
        </div>
      ) : null}
      {showGeneratorForm ? (
        <>
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)]">
              <div className="space-y-1">
                <Label id="runtime-pairing-address-label" htmlFor="runtime-pairing-address">
                  {t('settings.runtimePairing.connectionAddress')}
                </Label>
                <div className="flex items-center gap-2">
                  <Select value={selectedAddress} onValueChange={updateSelectedAddress}>
                    <SelectTrigger
                      id="runtime-pairing-address"
                      size="sm"
                      className="min-w-[220px]"
                      aria-labelledby="runtime-pairing-address-label"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={LOOPBACK_ADDRESS}>
                        {t('settings.runtimePairing.thisComputer', { address: LOOPBACK_ADDRESS })}
                      </SelectItem>
                      {networkInterfaces.map((networkInterface, index) => (
                        <SelectItem
                          key={`${networkInterface.name}:${networkInterface.address}:${index}`}
                          value={networkInterface.address}
                        >
                          {networkInterface.name} ({networkInterface.address})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* Why: server sharing uses the same interface list as Mobile,
                      and VPN/tailnet addresses can appear after Settings opens. */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => void loadNetworkInterfaces({ showToastOnError: true })}
                        disabled={refreshingNetworkInterfaces}
                        aria-label={t('settings.runtimePairing.refreshAddresses')}
                        className="text-muted-foreground"
                      >
                        <RefreshCw className={refreshingNetworkInterfaces ? 'animate-spin' : ''} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" sideOffset={6}>
                      {t('settings.runtimePairing.refreshAddresses')}
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className="min-w-0 space-y-1">
                <Label htmlFor="runtime-pairing-custom-address">
                  {t('settings.runtimePairing.customAddress')}
                </Label>
                <Input
                  id="runtime-pairing-custom-address"
                  value={customAddress}
                  onChange={(event) => updateCustomAddress(event.target.value)}
                  placeholder={t('settings.runtimePairing.customAddressPlaceholder')}
                  className="h-8 font-mono text-xs"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {t('settings.runtimePairing.addressHint')}
            </p>
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => void generateRuntimePairingUrl()}
                disabled={isGeneratingPairing}
              >
                {isGeneratingPairing ? <Loader2 className="animate-spin" /> : <RefreshCw />}
                {t('settings.runtimePairing.generateAccessLink')}
              </Button>
            </div>
          </div>

          {webClientUrl ? (
            <GeneratedUrlRow
              label={t('settings.runtimePairing.openInBrowser')}
              description={t('settings.runtimePairing.browserUrlDescription')}
              value={webClientUrl}
              copied={copiedTarget === 'web'}
              onCopy={() => void copyGeneratedUrl('web', webClientUrl)}
            />
          ) : runtimePairingUrl ? (
            <UnavailableUrlRow
              label={t('settings.runtimePairing.openInBrowser')}
              description={t('settings.runtimePairing.browserUrlUnavailable')}
            />
          ) : null}

          {runtimePairingUrl ? (
            <GeneratedUrlRow
              label={t('settings.runtimePairing.pairAnotherClient')}
              description={t('settings.runtimePairing.pairingUrlDescription')}
              value={runtimePairingUrl}
              copied={copiedTarget === 'pairing'}
              onCopy={() => void copyGeneratedUrl('pairing', runtimePairingUrl)}
            />
          ) : null}
        </>
      ) : null}

      <RuntimeAccessGrantList
        className={sharedAccessClassName}
        grants={runtimeAccessGrants}
        currentGrantId={runtimePairingDeviceId}
        isLoading={isLoadingAccessGrants}
        revokingGrantId={revokingGrantId}
        onRefresh={() => void loadRuntimeAccessGrants({ showToastOnError: true })}
        onRevoke={(grant) => void revokeRuntimeAccess(grant)}
      />
    </div>
  )
}
