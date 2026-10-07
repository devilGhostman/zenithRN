import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppSelector} from '@/infrastructure/redux/hooks';
import type {AppTabBarProps} from '@/types';
import {openBottomTab} from '@/navigation/customStackNavigator';

function activeTabName(state: AppTabBarProps['state'], names: string[]) {
  const route = [...state.routes].reverse().find((item) => names.includes(item.name));
  return route?.name;
}

export function DefaultBottomTabTemplate({state, navigation, tabBarOptions}: AppTabBarProps) {
  const insets = useSafeAreaInsets();
  const {colorPallete} = useAppSelector((appState) => appState.wacConfig);
  const screens = tabBarOptions.screens;
  const active = activeTabName(
    state,
    screens.map((screen) => screen.name),
  );

  return (
    <View
      style={[
        styles.bar,
        {
          paddingBottom: Math.max(insets.bottom, 8),
          backgroundColor: colorPallete.backgroundColor,
          borderTopColor: colorPallete.iconColor,
        },
      ]}
    >
      {screens.map((screen) => {
        const focused = active === screen.name;
        const color = focused ? colorPallete.buttonColor : colorPallete.iconColor;

        return (
          <Pressable
            key={screen.name}
            onPress={() => openBottomTab(navigation, state, screen.name, focused)}
            style={styles.item}
          >
            <Text style={[styles.label, {color}]}>{screen.displayName}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
  },
});
