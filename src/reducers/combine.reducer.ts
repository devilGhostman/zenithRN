import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {persistStorage} from '@/infrastructure';

// Reducers
import appReducer from '@/reducers/app.reducer';
import appConfigReducer from '@/reducers/appConfig.reducer';
import wacReducer from '@/reducers/wac.reducer';

const appPersistConfig = {
  key: 'app',
  storage: persistStorage,
  whitelist: ['appName',],
  blacklist: [''],
};
const app = persistReducer(appPersistConfig, appReducer);

const appConfigPersistConfig = {
  key: 'appConfig',
  storage: persistStorage,
};
const appConfig = persistReducer(appConfigPersistConfig, appConfigReducer);

const wacPersistConfig = {
  key: 'wacConfig',
  storage: persistStorage,
};
const wacConfig = persistReducer(wacPersistConfig, wacReducer);

export default combineReducers({
  app,
  appConfig,
  wacConfig,
});

