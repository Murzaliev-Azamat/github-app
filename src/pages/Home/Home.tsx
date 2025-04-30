import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlise';
import { Box } from '@mui/material';
import { GITHUB_CLIENT_SECRET } from '../../constants';
import { getUserProfile } from '../users/usersThunks';
import Login from '../users/Login';
import Profile from '../../components/UI/Profile/Profile';

const Home = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!localStorage.getItem('client_secret')) {
      localStorage.setItem('client_secret', GITHUB_CLIENT_SECRET);
    }
    dispatch(getUserProfile());
  }, [dispatch]);

  return <Box>{user ? <Profile /> : <Login />}</Box>;
};

export default Home;
