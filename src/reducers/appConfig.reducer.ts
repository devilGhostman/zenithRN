import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {ThemeConfig} from '@/types';
import {AppConfigUtility, type ColorPallete} from '@/utils';

export type AppConfigState = {
  appId: string | null;
  orgId: string | null;
  appName: string | null;
  logoUrl: string | null;
  themeConfig: ThemeConfig | null;
  templateConfig: Record<string, unknown> | null;
  colorPallete: ColorPallete;
  aliases: Record<string, string>;
};

const initialState: AppConfigState = {
  appId: null,
  orgId: null,
  appName: null,
  logoUrl: null,
  themeConfig: null,
  templateConfig: null,
  colorPallete: AppConfigUtility.getColorConfig(),
  aliases: {},
};

const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setAppConfig: (state, action: PayloadAction<Partial<AppConfigState> | undefined>) => {
      const payload = action.payload;
      state.appId = payload?.appId ?? null;
      state.orgId = payload?.orgId ?? null;
      state.appName = payload?.appName ?? null;
      state.logoUrl = payload?.logoUrl ?? null;
      state.themeConfig = payload?.themeConfig ?? null;
      state.templateConfig = payload?.templateConfig ?? {};
      state.colorPallete = payload?.colorPallete ?? initialState.colorPallete;
      state.aliases = payload?.aliases ?? {};
    },
  },
});

export const {setAppConfig} = appConfigSlice.actions;
export default appConfigSlice.reducer;
