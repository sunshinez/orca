import { ExternalLink, Loader2, QrCode, RefreshCw, Wifi } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import type { MobileNetworkInterface } from './mobile-network-interface-selection'

const TAILSCALE_DOWNLOAD_URL = 'https://tailscale.com/download'

type MobileNetworkInterfaceSectionProps = {
  networkInterfaces: MobileNetworkInterface[]
  selectedAddress: string | undefined
  onSelectedAddressChange: (address: string) => void
  refreshingNetworkInterfaces: boolean
  onRefreshNetworkInterfaces: () => void
  loading: boolean
  hasQrCode: boolean
  onGenerateQr: () => void
}

function formatInterfaceLabel(iface: MobileNetworkInterface): string {
  return `${iface.address} (${iface.name})`
}

export function MobileNetworkInterfaceSection({
  networkInterfaces,
  selectedAddress,
  onSelectedAddressChange,
  refreshingNetworkInterfaces,
  onRefreshNetworkInterfaces,
  loading,
  hasQrCode,
  onGenerateQr
}: MobileNetworkInterfaceSectionProps): React.JSX.Element {
  const { t } = useTranslation()
  return (
    <div className="rounded-lg border border-border/60 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Wifi className="size-4 text-muted-foreground" />
        <span className="text-sm font-medium">{t('settings.mobileNetwork.title')}</span>
      </div>
      <p className="text-muted-foreground mb-3 text-xs">
        {t('settings.mobileNetwork.description')}
      </p>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <Select value={selectedAddress} onValueChange={onSelectedAddressChange}>
            <SelectTrigger size="sm" className="min-w-[220px]">
              <SelectValue placeholder={t('settings.mobileNetwork.noInterfaces')} />
            </SelectTrigger>
            <SelectContent>
              {networkInterfaces.map((iface) => (
                <SelectItem key={`${iface.name}-${iface.address}`} value={iface.address}>
                  {formatInterfaceLabel(iface)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Why: VPN/tailnet interfaces can appear after this pane mounts.
              Re-enumerating OS state here avoids requiring an Orca restart. */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onRefreshNetworkInterfaces}
                disabled={refreshingNetworkInterfaces}
                aria-label={t('settings.mobileNetwork.refreshAriaLabel')}
                className="text-muted-foreground"
              >
                <RefreshCw className={refreshingNetworkInterfaces ? 'animate-spin' : ''} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={6}>
              {t('settings.mobileNetwork.refreshTooltip')}
            </TooltipContent>
          </Tooltip>
        </div>
        <Button
          onClick={onGenerateQr}
          disabled={loading || !selectedAddress}
          size="sm"
          className="gap-1.5"
        >
          {loading ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : hasQrCode ? (
            <RefreshCw className="size-3.5" />
          ) : (
            <QrCode className="size-3.5" />
          )}
          {hasQrCode
            ? t('settings.mobileNetwork.regenerateQr')
            : t('settings.mobileNetwork.generateQr')}
        </Button>
      </div>
      <Accordion type="single" collapsible className="mt-4 border-t border-border/60 pt-2">
        <AccordionItem value="remote-pairing-guide">
          <AccordionTrigger className="py-2 text-xs">
            {t('settings.mobileNetwork.tailnetAccordionTitle')}
          </AccordionTrigger>
          <AccordionContent className="space-y-3 text-xs text-muted-foreground">
            <p>{t('settings.mobileNetwork.tailnetDescription')}</p>
            <ol className="list-decimal space-y-1 pl-4">
              <li>
                {t('settings.mobileNetwork.tailnetStep1Prefix')}{' '}
                <button
                  type="button"
                  onClick={() => void window.api.shell.openUrl(TAILSCALE_DOWNLOAD_URL)}
                  className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-2 hover:underline"
                >
                  Tailscale
                  <ExternalLink className="size-3" />
                </button>{' '}
                {t('settings.mobileNetwork.tailnetStep1Suffix')}
              </li>
              <li>{t('settings.mobileNetwork.tailnetStep2')}</li>
              <li>{t('settings.mobileNetwork.tailnetStep3')}</li>
              <li>{t('settings.mobileNetwork.tailnetStep4')}</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
