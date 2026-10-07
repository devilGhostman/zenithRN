/* eslint-env jest */

import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-mmkv', () => {
  const data = new Map();
  return {
    createMMKV: () => ({
      set: (key, value) => {
        data.set(key, String(value));
      },
      getString: key => data.get(key),
      remove: key => data.delete(key),
      clearAll: () => data.clear(),
      addOnValueChangedListener: () => ({ remove: () => undefined }),
    }),
  };
});

jest.mock('redux-persist', () => {
  const persist = jest.requireActual('redux-persist');
  return {
    ...persist,
    persistStore: () => ({
      pause: jest.fn(),
      persist: jest.fn(),
      purge: jest.fn(() => Promise.resolve()),
      flush: jest.fn(() => Promise.resolve()),
      dispatch: jest.fn(),
      getState: () => ({ bootstrapped: true }),
      subscribe: callback => {
        callback();
        return () => undefined;
      },
    }),
  };
});

jest.mock('react-native-video', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    useVideoPlayer: () => ({
      play: jest.fn(),
      pause: jest.fn(),
      preload: jest.fn(),
      loop: false,
      muted: true,
    }),
    useEvent: jest.fn(),
    VideoView: props =>
      React.createElement(View, { testID: 'video-view', ...props }),
  };
});

jest.mock('@rozenite/tanstack-query-plugin', () => ({
  useTanStackQueryDevTools: () => undefined,
}));

jest.mock('@rozenite/redux-devtools-plugin', () => ({
  rozeniteDevToolsEnhancer: () => (createStore) => createStore,
  useReduxDevToolsAgentTools: () => undefined,
}));

jest.mock('@rozenite/react-navigation-plugin', () => ({
  useReactNavigationDevTools: () => undefined,
}));

jest.mock('@rozenite/network-activity-plugin', () => ({
  useNetworkActivityDevTools: () => undefined,
  withOnBootNetworkActivityRecording: () => undefined,
}));

jest.mock('@rozenite/storage-plugin', () => ({
  createMMKVStorageAdapter: () => ({}),
  useRozeniteStoragePlugin: () => undefined,
}));

jest.mock('react-native-linear-gradient', () => {
  const React = require('react');
  const {View} = require('react-native');
  const LinearGradient = ({children, ...props}) => React.createElement(View, props, children);
  return {
    __esModule: true,
    default: LinearGradient,
  };
});

jest.mock('@legendapp/list/react-native', () => {
  const { FlatList } = require('react-native');
  return { LegendList: FlatList };
});
