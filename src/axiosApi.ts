import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { apiUrl } from './constants';
import { RootState } from './app/store';
import { Store } from '@reduxjs/toolkit';

const axiosApi = axios.create({
  baseURL: apiUrl,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.accessToken;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', `token ${token}`);

    if (!headers.has('Accept')) {
      headers.set('Accept', 'application/vnd.github+json');
    }

    return config;
  });
};

export default axiosApi;
