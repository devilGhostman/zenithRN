/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

if (__DEV__) {
  require('@rozenite/network-activity-plugin').withOnBootNetworkActivityRecording();
}

AppRegistry.registerComponent(appName, () => App);
