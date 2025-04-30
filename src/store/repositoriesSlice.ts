import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Repository } from '../types';
import { getRepositories } from './repositoriesThunks';

interface RepositoriesState {
  repositories: Repository[] | [];
  fetchAllLoading: boolean;
}

const initialState: RepositoriesState = {
  repositories: [],
  fetchAllLoading: false,
};

export const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRepositories.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(getRepositories.fulfilled, (state, action) => {
      state.fetchAllLoading = false;
      state.repositories = action.payload;
    });
    builder.addCase(getRepositories.rejected, (state) => {
      state.fetchAllLoading = false;
    });
  },
});

export const repositoriesReducer = repositoriesSlice.reducer;

export const selectRepositories = (state: RootState) => state.repositories.repositories;
export const selectFetchAllLoading = (state: RootState) => state.repositories.fetchAllLoading;
