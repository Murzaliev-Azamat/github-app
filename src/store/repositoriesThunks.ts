import { createAsyncThunk } from '@reduxjs/toolkit';
import { Repository } from '../types';
import axiosApi from '../axiosApi';

export const getRepositories = createAsyncThunk<Repository[]>(
  'repositories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get<Repository[]>('/user/repos?per_page=50&sort=updated&direction=desc', {});
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при получении репозиториев');
    }
  },
);
