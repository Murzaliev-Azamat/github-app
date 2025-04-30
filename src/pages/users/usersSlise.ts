import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../types';
import { editUserProfile, getUserProfile } from './usersThunks';

interface UsersState {
  user: User | null;
  fetchLoading: boolean;
  editLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  fetchLoading: false,
  editLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, { payload: user }) => {
      state.fetchLoading = false;
      state.user = user;
    });
    builder.addCase(getUserProfile.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(editUserProfile.pending, (state) => {
      state.editLoading = true;
    });
    builder.addCase(editUserProfile.fulfilled, (state) => {
      state.editLoading = false;
    });
    builder.addCase(editUserProfile.rejected, (state) => {
      state.editLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const { clearUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectFetchLoading = (state: RootState) => state.users.fetchLoading;
export const selectEditLoading = (state: RootState) => state.users.fetchLoading;
