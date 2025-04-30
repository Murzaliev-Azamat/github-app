import React from 'react';
import { Avatar, Box, Container, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import GitHubLoginButton from '../../components/UI/GitHubLoginButton/GitHubLoginButton';

const Login = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={{
          marginTop: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <Box sx={{ pt: 2 }}>
          <GitHubLoginButton />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
