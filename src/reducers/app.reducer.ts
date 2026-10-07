import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AppState = {
  appName: string;
  activeVideoId: string | null;
  isMuted: boolean;
};

const initialState: AppState = {
  appName: 'Zenith',
  activeVideoId: null,
  isMuted: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppName: (state, action: PayloadAction<string>) => {
      state.appName = action.payload;
    },
    setActiveVideoId: (state, action: PayloadAction<string | null>) => {
      state.activeVideoId = action.payload;
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
  },
});

export const {setAppName, setActiveVideoId, toggleMute} = appSlice.actions;
export default appSlice.reducer;
