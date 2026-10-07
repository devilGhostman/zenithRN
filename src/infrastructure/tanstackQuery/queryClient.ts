import { QueryClient } from '@tanstack/react-query';

let queryClient: QueryClient | undefined;

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnReconnect: true,
      },
    },
  });
}

export function getQueryClient() {
  if (!queryClient) {
    queryClient = makeQueryClient();
  }

  return queryClient;
}
