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

export function FloatingBottomTabTemplate({state, navigation, tabBarOptions}: AppTabBarProps) {
  const insets = useSafeAreaInsets();
  const {colorPallete} = useAppSelector((appState) => appState.wacConfig);
  const screens = tabBarOptions.screens;
  const active = activeTabName(
    state,
    screens.map((screen) => screen.name),
  );

  return (
    <View style={[styles.wrap, {paddingBottom: Math.max(insets.bottom, 12)}]} pointerEvents="box-none">
      <View style={[styles.bar, {backgroundColor: colorPallete.primaryColor}]}>
        {screens.map((screen) => {
          const focused = active === screen.name;
          const color = focused ? colorPallete.buttonColor : colorPallete.textColor;

          return (
            <Pressable
              key={screen.name}
              onPress={() => openBottomTab(navigation, state, screen.name, focused)}
              style={[styles.item, focused && {backgroundColor: colorPallete.backgroundColor}]}
            >
              <Text style={[styles.label, {color}]}>{screen.displayName}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
  },
  bar: {
    flexDirection: 'row',
    borderRadius: 28,
    padding: 6,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    borderRadius: 22,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
  },
});
