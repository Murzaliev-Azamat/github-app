import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GITHUB_CLIENT_ID } from '../constants';

interface GitHubAccessTokenResponse {
  access_token: string;
}

export const fetchAccessToken = createAsyncThunk<string, string>('auth/fetchAccessToken', async (code: string) => {
  const clientSecret = localStorage.getItem('client_secret');

  if (!clientSecret) {
    throw new Error('No client secret');
  }

  const response = await axios.post<GitHubAccessTokenResponse>(
    'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token',
    {
      client_id: GITHUB_CLIENT_ID,
      client_secret: clientSecret,
      code,
    },
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );

  return response.data.access_token;
});
