import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { fetchAccessToken } from './authThunks';

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    deleteAccessToken: (state) => {
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload;
    });
  },
});
export const authReducer = authSlice.reducer;
export const { setAccessToken, deleteAccessToken } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.accessToken;
