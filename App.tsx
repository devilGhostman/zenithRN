import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SplashGate} from '@/components';
import {RootNavigator} from '@/navigation';
import {ThemeWrapper, QueryProvider, ReduxProvider} from '@/infrastructure';

const RozeniteAppDevTools = __DEV__ ? require('@/infrastructure/devtools/rozenite').RozeniteAppDevTools : () => null;

function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <ReduxProvider>
          <RozeniteAppDevTools />
          <QueryProvider>
            <ThemeWrapper>
              <SplashGate>
                {(initialUrl) => <RootNavigator initialUrl={initialUrl} />}
              </SplashGate>
            </ThemeWrapper>
          </QueryProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
