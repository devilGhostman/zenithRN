# Zenith RN

Bare React Native CLI app (RN 0.87, React 19, New Architecture + Hermes). Package `com.zenith`. Path alias `@/*` → `src/*` (TypeScript `paths` + Babel `module-resolver`).

## Stack

- Navigation: native-stack
- State: Redux Toolkit + redux-persist + MMKV
- Server cache: TanStack Query
- HTTP: Axios behind `HttpClient` (`src/infrastructure/http`)
- Video: react-native-video, lists: Legend List
- Gradients: `react-native-linear-gradient`
- Dev: Rozenite in React Native DevTools (`WITH_ROZENITE=true` on `npm start`)

## Layout

- `src/infrastructure/` — HTTP, Redux store/providers, Query, socket, wrappers
- `src/reducers/` — slices + `combineReducers` (store stays thin)
- `src/hooks/` — query options + service factories (function hooks only)
- `src/components/`, `src/screens/`, `src/navigation/`, `src/constants/`, `src/utils/`, `src/types/`

## React

- Function components and hooks only. No React class components.
- Keep service objects (`createWacService(http)`) plus function hooks. Do not turn services into classes unless asked.

## Imports

- Prefer `@/` for cross-folder imports.
- Import the folder, not a file inside it.
  - Good: `from '@/utils'`
  - Bad: `from '@/utils/nativeStorage.utility'`
- The folder import resolves to that folder's `index.ts`. If `index.ts` is missing, create it and re-export every module in the folder from it.
- Do not add a mega `src/index.ts`.
- `src/reducers/index.ts` is the root reducer. Import slices and actions from `@/reducers` only after they are named exports there. Do not replace the default `combineReducers` export.

## Types

- Named types for a `src` folder live in `src/types/<folder>.types.ts` (`src/navigation` → `src/types/navigation.types.ts`).
- Import them from `@/types`.
- Do not declare those types inside implementation files.

## HTTP + TanStack Query

Axios already returns `response.data` (JSON body). API body is `{status:{code,message},data}`.

- Unwrap the envelope in the **service** (or once in the HTTP client if every endpoint uses it).
- Query cache stores **domain data** (`response.data`), not the envelope.
- HTTP 200 with a failed business `status.code` should throw (`ApiError`) so Query is `isError`.
- Do not unwrap again in every `queryFn`.

## WAC / theme bootstrap

1. `ThemeWrapper` (`src/infrastructure/wrapper/theme.wrapper.tsx`) runs inside Redux + Query.
2. `useQuery(wacQueries.getWac(appId))` at component top level — never inside `useEffect`.
3. `AppConfigUtility.getWacRecord` then `AppConfigUtility.configerWacConfig` (defaults, aliases, CDN logo).
4. `dispatch(setWacConfig(...))` into persisted `state.wacConfig`.
5. `Gradient` reads `bgGradient` / `themeConfig.bgConfig` from Redux.

Config helpers live as **static methods** on `AppConfigUtility` (`src/utils/appConfig.utility.ts`).

## Redux

- Add a slice in `src/reducers/`, wrap with `persistReducer` in `src/reducers/index.ts`, add to `combineReducers`.
- Persist storage is MMKV (`persistStorage`). Do not use AsyncStorage.

## Native modules

After adding native deps (`react-native-linear-gradient`, MMKV, etc.): `pod install` (iOS) and a **full native rebuild**. Metro reload is not enough. `BVLinearGradient` missing = binary not rebuilt.

`react-native-linear-gradient` is the app background gradient. Do not use `react-native-svg` LinearGradient for that.

## Style

Match `.prettierrc.js`: `printWidth` 120, `singleQuote`, `semi`, `trailingComma: 'all'`, `bracketSpacing: false`, `arrowParens: 'always'`.

## Git

Do not commit, push, or skip hooks unless the user asks.

## Template loading

Use both mechanisms. They solve different problems.

- Enable Metro `inlineRequires: true` (and `experimentalImportSupport: true`) for the whole app. That defers module evaluation until first use so the first launch stays fast. Do not use it to choose a template.
- Load each screen and each runtime template with `lazy` from its file, then `suspendedTemplate` from `@/utils`, both once at module scope. Do not add a folder per template.

```ts
const HomeScreen = suspendedTemplate(lazy(() => import('@/screens/HomeScreen')));

const DefaultBottomTabTemplate = suspendedTemplate(
  lazy(() =>
    import('@/components/bottomNavigation/templates/default.template').then((module) => ({
      default: module.DefaultBottomTabTemplate,
    })),
  ),
);
```

- A default export goes straight into `lazy(() => import('...'))`. A named export is mapped to `{default}` in `.then`.
- Pass a fallback component as the second argument of `suspendedTemplate` when one should show. Otherwise the fallback is `null`.
- Do not statically import every screen or template. A top-level `import` pulls that file into the startup graph and cancels the deferral.
- Do not lazy-load shared logic: player contract, engine, Redux slices, progress store, or screen hooks. Those stay normal imports.
- Build-time codegen (`activeTemplates`, one template per screen per brand) stays the default when a brand does not switch templates at runtime. Do not replace codegen with `React.lazy` for that case.
- Release builds still ship one Metro bundle. `React.lazy` and `inlineRequires` do not remove unused templates from the APK/IPA.
