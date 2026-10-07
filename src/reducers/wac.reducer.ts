import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type WacColorPalette = {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  iconColor: string;
  buttonColor: string;
};

export type WacState = {
  appName: string | null;
  logoUrl: string | null;
  themeConfig: Record<string, unknown> | null;
  gradient: string[];
  bgGradient: string[];
  colorPallete: WacColorPalette;
  adMobAdInterval: number;
  appId: string | null;
};

const initialState: WacState = {
  appName: null,
  logoUrl: null,
  themeConfig: null,
  gradient: [],
  bgGradient: ['#000000', '#000000'],
  colorPallete: {
    primaryColor: '#000000',
    backgroundColor: '#000000',
    textColor: '#ffffff',
    iconColor: '#ffffff',
    buttonColor: '#06B2FF',
  },
  adMobAdInterval: 20,
  appId: null,
};

const wacSlice = createSlice({
  name: 'wacConfig',
  initialState,
  reducers: {
    setWacConfig: (state, action: PayloadAction<Partial<WacState> | undefined>) => {
      const payload = action.payload;
      state.appName = payload?.appName ?? null;
      state.logoUrl = payload?.logoUrl ?? null;
      state.themeConfig = payload?.themeConfig ?? {};
      state.gradient = payload?.gradient ?? [];
      state.bgGradient = payload?.bgGradient ?? [];
      state.colorPallete = payload?.colorPallete ?? initialState.colorPallete;
      state.adMobAdInterval = payload?.adMobAdInterval ?? 20;
      state.appId = payload?.appId ?? null;
    },
  },
});

export const {setWacConfig} = wacSlice.actions;
export default wacSlice.reducer;
