import { sloApi } from 'app/features/alerting/unified/api/sloApi';
import { usePluginBridge } from 'app/features/alerting/unified/hooks/usePluginBridge';
import { SupportedPlugin } from 'app/features/alerting/unified/types/pluginBridges';

export function useSlosChecks() {
  const { installed: sloPluginInstalled } = usePluginBridge(SupportedPlugin.Slo);

  const { data: sloChecks } = sloApi.endpoints.getSlos.useQuery(undefined, {
    skip: !sloPluginInstalled,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  return Boolean(sloChecks?.slos?.length)
    ? {
        hasSlos: true,
        hasSlosWithAlerting: sloChecks?.slos.some((slo) => Boolean(slo.alerting?.fastBurn)),
      }
    : { hasSlos: false, hasSlosWithAlerting: false };
}
