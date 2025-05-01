import { createAsyncThunk } from '@reduxjs/toolkit';
import { AnotherUsersResponse, Repository } from '../types';
import axiosApi from '../axiosApi';

export interface SearchParams {
  search: string;
  page: number;
}

export const getAnotherUsersBySearch = createAsyncThunk<AnotherUsersResponse, SearchParams>(
  'anotherUsers/getAnotherUsersBySearch',
  async ({ search, page }) => {
    if (!search) {
      return {
        total_count: 0,
        incomplete_results: false,
        items: [],
      };
    }

    try {
      const response = await axiosApi.get<AnotherUsersResponse>('/search/users', {
        params: {
          q: search,
          per_page: 5,
          page: page,
        },
      });

      return {
        total_count: response.data.total_count,
        incomplete_results: response.data.incomplete_results,
        items: response.data.items,
      };
    } catch (error) {
      console.error('Ошибка запроса к GitHub API', error);
      return {
        total_count: 0,
        incomplete_results: false,
        items: [],
      };
    }
  },
);

export const getAnotherUserRepositories = createAsyncThunk<Repository[], string>(
  'anotherUsers/getAnotherUserRepositories',
  async (reposUrl: string) => {
    try {
      const response = await axiosApi.get<Repository[]>(reposUrl + '?per_page=10');
      return response.data;
    } catch (error) {
      console.error('Ошибка запроса к GitHub API', error);
    }
    return [];
  },
);
