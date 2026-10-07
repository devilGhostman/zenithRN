import { createMMKV } from 'react-native-mmkv';
import type { Storage } from 'redux-persist';

export const mmkv = createMMKV({ id: 'zenith-redux' });

export const persistStorage: Storage = {
  setItem: (key, value) => {
    mmkv.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = mmkv.getString(key);
    return Promise.resolve(value ?? null);
  },
  removeItem: key => {
    mmkv.remove(key);
    return Promise.resolve();
  },
};
