import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { User, UserMutation } from '../../types';
import { GITHUB_CLIENT_ID } from '../../constants';
import { RootState } from '../../app/store';
import { deleteAccessToken } from './authSlice';
import { clearUser } from './usersSlise';

export const getUserProfile = createAsyncThunk<User>('users/getUserProfile', async () => {
  const response = await axiosApi.get<User>('/user');

  if (!response.data) {
    throw new Error('Пользователь не найден');
  }

  return response.data;
});

export const editUserProfile = createAsyncThunk<void, UserMutation>('users/editUserProfile', async (params) => {
  const profileData = {
    name: params.name,
    company: params.company,
    location: params.location,
    bio: params.bio,
  };

  await axiosApi.patch('/user', profileData);
});

export const logout = createAsyncThunk<void, void, { state: RootState }>('users/logout', async (_, ThunkApi) => {
  const accessToken = ThunkApi.getState().auth.accessToken;
  const clientSecret = localStorage.getItem('client_secret');

  if (!clientSecret) {
    throw new Error('No client secret');
  }

  if (!accessToken) {
    throw new Error('No access token');
  }

  await axiosApi.delete(
    `https://cors-anywhere.herokuapp.com/https://api.github.com/applications/${GITHUB_CLIENT_ID}/token`,
    {
      auth: {
        username: GITHUB_CLIENT_ID,
        password: clientSecret,
      },
      data: {
        access_token: accessToken,
      },
    },
  );

  ThunkApi.dispatch(deleteAccessToken());
  ThunkApi.dispatch(clearUser());
});
