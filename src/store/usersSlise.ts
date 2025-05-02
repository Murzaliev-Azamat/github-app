import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { User } from '../types';
import { editUserProfile, getUserProfile } from './usersThunks';

interface UsersState {
  user: User | null;
  fetchUserLoading: boolean;
  editUserLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  fetchUserLoading: false,
  editUserLoading: false,
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
      state.fetchUserLoading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, { payload: user }) => {
      state.fetchUserLoading = false;
      state.user = user;
    });
    builder.addCase(getUserProfile.rejected, (state) => {
      state.fetchUserLoading = false;
    });
    builder.addCase(editUserProfile.pending, (state) => {
      state.editUserLoading = true;
    });
    builder.addCase(editUserProfile.fulfilled, (state) => {
      state.editUserLoading = false;
    });
    builder.addCase(editUserProfile.rejected, (state) => {
      state.editUserLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const { clearUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectFetchUserLoading = (state: RootState) => state.users.fetchUserLoading;
export const selectEditUserLoading = (state: RootState) => state.users.editUserLoading;
