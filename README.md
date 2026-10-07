# Zenith

Bare **React Native CLI** app (no Expo) for iOS and Android.

The display name is **Zenith**. The folder is `zenithRN` because a Next.js app already occupies `zenith` in this workspace.

## Stack

| Library | Role |
| --- | --- |
| React Native 0.87 | App runtime, New Architecture + Hermes |
| Redux + Redux Toolkit | App state (`src/redux`) |
| redux-persist | Persist selected reducers to MMKV |
| React Navigation | Native stack + deep links |
| react-native-video v7 | Native video playback |
| @legendapp/list | Virtualized feed list |
| Rozenite | DevTools panels for Redux, Query, navigation, network, MMKV |

## Run

```sh
npm start
npm run android
# or
cd ios && bundle install && bundle exec pod install && cd ..
npm run ios
```

## Debugging

`npm start` enables Rozenite. Open React Native DevTools (`j` in Metro) for Redux, TanStack Query, navigation, network, and MMKV.

## Redux persist

Persisted slices are listed in `src/redux/store.ts`:

- `persistConfig.whitelist` — reducer keys to persist (`app` today)
- `appPersistConfig.whitelist` — fields inside `app` (`appName`, `isMuted`)

`activeVideoId` is not persisted. Add a reducer name or field to those arrays to persist more state.

## Deep linking

Custom scheme: `zenith://`

| URL | Screen |
| --- | --- |
| `zenith://` | Home |
| `zenith://video/big-buck-bunny` | Video player |

Test on a simulator/emulator:

```sh
# iOS
xcrun simctl openurl booted "zenith://video/big-buck-bunny"

# Android
adb shell am start -W -a android.intent.action.VIEW -d "zenith://video/big-buck-bunny" com.zenith
```

HTTPS prefixes (`https://zenith.app`) are mapped in `src/navigation/linking.ts`. For Universal Links / App Links, add Associated Domains on iOS and host Digital Asset Links on that domain.

## Project layout

```
src/
  navigation/       stack navigator + linking config
  redux/            store, persist whitelist, typed hooks, app slice
  tanstackQuery/    QueryClient + provider
  infrastructure/   video query/service
  screens/          Home feed, Video player
  components/       Video card
  devtools/         Rozenite DevTools hooks
```
