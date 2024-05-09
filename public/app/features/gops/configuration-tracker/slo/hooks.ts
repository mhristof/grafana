import { sloApi } from 'app/features/alerting/unified/api/sloApi';
import { usePluginBridge } from 'app/features/alerting/unified/hooks/usePluginBridge';
import { SupportedPlugin } from 'app/features/alerting/unified/types/pluginBridges';

export function useSloChecks() {
  const { installed: sloPluginInstalled } = usePluginBridge(SupportedPlugin.Slo);

  const { data } = sloApi.endpoints.getSlos.useQuery(undefined, {
    skip: !sloPluginInstalled,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  return Boolean(data?.slos?.length)
    ? {
        hasSloCreated: true,
        hasSloWithAlerting: data?.slos.some((slo) => Boolean(slo.alerting)),
      }
    : { hasSloCreated: false, hasSloWithAlerting: false };
}
