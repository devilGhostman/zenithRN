import React, {useRef} from 'react';
import {DarkTheme, NavigationContainer, type NavigationContainerRef} from '@react-navigation/native';
import {ROUTES} from '@/constants';
import {useAppSelector} from '@/infrastructure/redux/hooks';
import {getBottomTabTemplate} from '@/components/bottomNavigation';
import {createAppStackNavigator} from '@/navigation/customStackNavigator';
import {linking} from '@/navigation/linking';
import {BOTTOM_SCREENS, MAIN_SCREENS,getBottomScreens} from '@/navigation/screens.constant';
import type {Screen} from '@/navigation/screen';
import type {RootStackParamList} from '@/types';

const Stack = createAppStackNavigator();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'transparent',
    card: '#0b0c10',
    primary: '#f5c16c',
    text: '#f4f5f7',
    border: '#23262f',
  },
};

const RozeniteNavigationDevTools = __DEV__
  ? require('@/infrastructure/devtools/rozenite').RozeniteNavigationDevTools
  : () => null;

const bottomTabScreens = getBottomScreens();

function renderTabScreen(screen: Screen) {
  const {displayName} = screen.options;

  return (
    <Stack.Screen
      key={screen.name}
      name={screen.name}
      component={screen.component}
      options={{
        ...screen.options,
        title: screen.options.title ?? displayName,
      }}
    />
  );
}

export function RootNavigator() {
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList> | null>(null);
  const controlBar = useAppSelector((state) => state.wacConfig.themeConfig?.controlBar);
  const TabBar = getBottomTabTemplate(controlBar);

  return (
    <>
      <RozeniteNavigationDevTools navigationRef={navigationRef} />
      <NavigationContainer ref={navigationRef} linking={linking} theme={navigationTheme}>
        <Stack.Navigator
          initialRouteName={ROUTES.HOME}
          tabBar={TabBar}
          tabBarOptions={{screens: bottomTabScreens}}
          screenOptions={{
            headerStyle: {backgroundColor: '#0b0c10'},
            headerTintColor: '#f5c16c',
            headerTitleStyle: {fontWeight: '700'},
            contentStyle: {backgroundColor: 'transparent'},
          }}
        >
          {MAIN_SCREENS.map((screen) => renderTabScreen(screen))}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
