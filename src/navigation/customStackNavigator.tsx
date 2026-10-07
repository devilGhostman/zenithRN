import {createNavigatorFactory, StackRouter, useNavigationBuilder} from '@react-navigation/native';
import {NativeStackView} from '@react-navigation/native-stack';
import React from 'react';
import type {AppStackNavigatorProps, AppTabBarProps} from '@/types';

export function openBottomTab(
  navigation: AppTabBarProps['navigation'],
  state: AppTabBarProps['state'],
  name: string,
  focused: boolean,
) {
  if (focused) {
    return;
  }

  navigation.navigate(name);
}

function AppStackNavigator({
  id,
  initialRouteName,
  children,
  screenListeners,
  screenOptions,
  tabBar: TabBar,
  tabBarOptions,
  ...rest
}: AppStackNavigatorProps) {
  const {state, describe, descriptors, navigation, render} = useNavigationBuilder(StackRouter, {
    id,
    initialRouteName,
    children,
    screenListeners,
    screenOptions,
  } as never);

  return render(
    <>
      <NativeStackView
        {...rest}
        state={state}
        navigation={navigation}
        descriptors={descriptors as never}
        describe={describe as never}
      />
      {TabBar && tabBarOptions?.screens?.length ? (
        <TabBar navigation={navigation as AppTabBarProps['navigation']} state={state} tabBarOptions={tabBarOptions} />
      ) : null}
    </>,
  );
}

export function createAppStackNavigator() {
  return createNavigatorFactory(AppStackNavigator)();
}
