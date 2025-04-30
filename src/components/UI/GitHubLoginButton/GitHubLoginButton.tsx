import React from 'react';
import { GITHUB_CLIENT_ID, REDIRECT_URI } from '../../../constants';
import { Button } from '@mui/material';

const GitHubLoginButton = () => {
  const handleLogin = () => {
    const loginParam = '';
    const scope = 'repo user';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}&login=${loginParam}`;
  };

  return (
    <Button onClick={handleLogin} variant="contained">
      Login with GitHub
    </Button>
  );
};

export default GitHubLoginButton;
