import {queryOptions, useMutation} from '@tanstack/react-query';
import {getQueryClient} from '@/infrastructure/tanstackQuery/queryClient';
import wacService from '@/hooks/wac/wac.service';

export const WACKEYS = {
  wac: (appId: string) => ['wac', appId] as const,
  getAllMultiIframes: (appId: string) => [...WACKEYS.wac(appId), 'multiIframes'] as const,
  getKeycloakAuthUrl: () => ['wac', 'keycloakAuthUrl'] as const,
};

export const wacQueries = {
  getWac: (appId: string) =>
    queryOptions({
      queryKey: WACKEYS.wac(appId),
      queryFn: () => wacService.fetchWacConfig(appId),
    }),

  getServerSideWac: (appId: string) =>
    queryOptions({
      queryKey: WACKEYS.wac(appId),
      queryFn: () => wacService.fetchWacConfig(appId),
    }),

  getAllMultiIframes: (appId: string) =>
    queryOptions({
      queryKey: WACKEYS.getAllMultiIframes(appId),
      queryFn: () => wacService.fetchAllMultiIframes(appId),
    }),

  getKeycloakAuthUrl: () =>
    queryOptions({
      queryKey: WACKEYS.getKeycloakAuthUrl(),
      queryFn: () => wacService.fetchKeycloakAuthUrl(),
    }),
};

export function useSetOnlyAppHashInWac() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: ({appId, appHash}: {appId: string; appHash: string}) => wacService.setOnlyAppHash(appId, appHash),
    onSuccess: (_data, {appId}) => {
      queryClient.invalidateQueries({queryKey: WACKEYS.wac(appId)});
    },
  });
}
