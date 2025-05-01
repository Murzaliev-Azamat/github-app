import React from 'react';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../store/usersThunks';
import { NavLink, useNavigate } from 'react-router-dom';

const UserMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <Button
        component={NavLink}
        to="/another-users"
        sx={{
          color: 'white',
        }}
      >
        Другие пользователи
      </Button>
      <Button
        component={NavLink}
        to="/repositories"
        sx={{
          color: 'white',
        }}
      >
        Репозитории
      </Button>
      <Button onClick={handleLogout} sx={{ color: 'white' }}>
        Logout
      </Button>
    </>
  );
};

export default UserMenu;
