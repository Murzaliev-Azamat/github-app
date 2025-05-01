import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { AnotherUsersResponse, Repository } from '../types';
import { getAnotherUserRepositories, getAnotherUsersBySearch } from './anotherUsersThunks';

interface AnotherUsersState {
  anotherUsers: AnotherUsersResponse | Record<string, never>;
  anotherUserRepositories: Repository[] | [];
  fetchAnotherUsersBySearchLoading: boolean;
  fetchAnotherUserRepositoriesLoading: boolean;
}

const initialState: AnotherUsersState = {
  anotherUsers: {},
  anotherUserRepositories: [],
  fetchAnotherUsersBySearchLoading: false,
  fetchAnotherUserRepositoriesLoading: false,
};

export const anotherUsersSlice = createSlice({
  name: 'anotherUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAnotherUsersBySearch.pending, (state) => {
      state.fetchAnotherUsersBySearchLoading = true;
    });
    builder.addCase(getAnotherUsersBySearch.fulfilled, (state, action) => {
      state.fetchAnotherUsersBySearchLoading = false;
      state.anotherUsers = action.payload;
    });
    builder.addCase(getAnotherUsersBySearch.rejected, (state) => {
      state.fetchAnotherUsersBySearchLoading = false;
    });
    builder.addCase(getAnotherUserRepositories.pending, (state) => {
      state.fetchAnotherUserRepositoriesLoading = true;
    });
    builder.addCase(getAnotherUserRepositories.fulfilled, (state, action) => {
      state.fetchAnotherUserRepositoriesLoading = false;
      state.anotherUserRepositories = action.payload;
    });
    builder.addCase(getAnotherUserRepositories.rejected, (state) => {
      state.fetchAnotherUserRepositoriesLoading = false;
    });
  },
});

export const anotherUsersReducer = anotherUsersSlice.reducer;

export const selectAnotherUsers = (state: RootState) => state.anotherUsers.anotherUsers;
export const selectAnotherUserRepositories = (state: RootState) => state.anotherUsers.anotherUserRepositories;

export const selectFetchAnotherUsersBySearchLoading = (state: RootState) =>
  state.anotherUsers.fetchAnotherUsersBySearchLoading;
export const selectFetchAnotherUserRepositoriesLoading = (state: RootState) =>
  state.anotherUsers.fetchAnotherUserRepositoriesLoading;
