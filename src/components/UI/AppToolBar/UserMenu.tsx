import React from 'react';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../pages/users/usersThunks';

const UserMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <>
      <Button onClick={handleLogout} sx={{ marginLeft: '10px', color: 'white' }}>
        Logout
      </Button>
    </>
  );
};

export default UserMenu;
