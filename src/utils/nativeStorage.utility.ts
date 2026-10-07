import {createMMKV} from 'react-native-mmkv';

const storage = createMMKV({id: 'zenith-native'});

export class NativeStorageUtility {
  static setItem(key: string, value: string | number | boolean): void {
    storage.set(key, value);
  }

  static getStringItem(key: string): string | undefined {
    return storage.getString(key);
  }

  static getNumberItem(key: string): number | undefined {
    return storage.getNumber(key);
  }

  static getBooleanItem(key: string): boolean | undefined {
    return storage.getBoolean(key);
  }

  static deleteItem(key: string): void {
    storage.remove(key);
  }

  static clearDb(): void {
    storage.clearAll();
  }
   
}
