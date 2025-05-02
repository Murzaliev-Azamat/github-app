import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Repository } from '../types';
import { getRepositories } from './repositoriesThunks';

interface RepositoriesState {
  repositories: Repository[] | [];
  fetchRepositoriesLoading: boolean;
}

const initialState: RepositoriesState = {
  repositories: [],
  fetchRepositoriesLoading: false,
};

export const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRepositories.pending, (state) => {
      state.fetchRepositoriesLoading = true;
    });
    builder.addCase(getRepositories.fulfilled, (state, action) => {
      state.fetchRepositoriesLoading = false;
      state.repositories = action.payload;
    });
    builder.addCase(getRepositories.rejected, (state) => {
      state.fetchRepositoriesLoading = false;
    });
  },
});

export const repositoriesReducer = repositoriesSlice.reducer;

export const selectRepositories = (state: RootState) => state.repositories.repositories;
export const selectFetchRepositoriesLoading = (state: RootState) => state.repositories.fetchRepositoriesLoading;
