import type {ComponentType} from 'react';
import type {ParamListBase, StackNavigationState} from '@react-navigation/native';
import type {NativeStackNavigationOptions, NativeStackNavigatorProps} from '@react-navigation/native-stack';
import {ROUTES} from '@/constants';

export type RootStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.SEARCH]: undefined;
  [ROUTES.MY_LIST]: undefined;
  [ROUTES.MORE]: undefined;
  [ROUTES.SHORT_REEL]: undefined;
  [ROUTES.PLAYER]: {id: string};
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type ScreenOptions = NativeStackNavigationOptions & {
  displayName?: string;
  channelId?: string;
  channelIndex?: number;
};

export type BottomBarScreen = {
  name: string;
  displayName: string;
};

export type AppTabBarProps = {
  navigation: {
    navigate: (name: string, params?: object) => void;
    dispatch: (action: unknown) => void;
  };
  state: StackNavigationState<ParamListBase>;
  tabBarOptions: {
    screens: BottomBarScreen[];
  };
};

export type AppStackNavigatorProps = NativeStackNavigatorProps & {
  tabBar?: ComponentType<AppTabBarProps>;
  tabBarOptions?: AppTabBarProps['tabBarOptions'];
};

export type BottomTabTemplate = ComponentType<AppTabBarProps>;
