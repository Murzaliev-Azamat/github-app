import React from 'react';
import Box from '@mui/material/Box';
import { useAppSelector } from '../../../app/hooks';
import UserMenu from './UserMenu';
import { selectUser } from '../../../pages/users/usersSlise';
import { Link as NavLink } from 'react-router-dom';
import { AppBar, styled, Toolbar, Typography } from '@mui/material';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <Box>
      <AppBar position="sticky" sx={{ mb: 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Test-attractor</Link>
          </Typography>
          {user && <UserMenu />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolBar;
