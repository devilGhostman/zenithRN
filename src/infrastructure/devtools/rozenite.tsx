import React from 'react';
import type {QueryClient} from '@tanstack/react-query';
import type {NavigationContainerRef} from '@react-navigation/native';
import {useTanStackQueryDevTools} from '@rozenite/tanstack-query-plugin';
import {useReactNavigationDevTools} from '@rozenite/react-navigation-plugin';
import {useNetworkActivityDevTools} from '@rozenite/network-activity-plugin';
import {useReduxDevToolsAgentTools} from '@rozenite/redux-devtools-plugin';
import {createMMKVStorageAdapter, useRozeniteStoragePlugin} from '@rozenite/storage-plugin';
import {mmkv} from '@/infrastructure/redux/mmkvStorage';

const storages = [
  createMMKVStorageAdapter({
    storages: {redux: mmkv},
  }),
];

export function RozeniteQueryDevTools({queryClient}: {queryClient: QueryClient}) {
  useTanStackQueryDevTools(queryClient);
  return null;
}

export function RozeniteNavigationDevTools({
  navigationRef,
}: {
  navigationRef: React.RefObject<NavigationContainerRef<ReactNavigation.RootParamList> | null>;
}) {
  useReactNavigationDevTools({ref: navigationRef});
  return null;
}

export function RozeniteAppDevTools() {
  useNetworkActivityDevTools();
  useRozeniteStoragePlugin({storages});
  useReduxDevToolsAgentTools();
  return null;
}
