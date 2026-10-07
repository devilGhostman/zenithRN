import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '@/infrastructure/tanstackQuery/queryClient';

type QueryProviderProps = {
  children: React.ReactNode;
};

const RozeniteQueryDevTools = __DEV__
  ? require('@/infrastructure/devtools/rozenite').RozeniteQueryDevTools
  : () => null;

export function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RozeniteQueryDevTools queryClient={queryClient} />
      {children}
    </QueryClientProvider>
  );
}
