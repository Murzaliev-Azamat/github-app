import React, { useEffect } from 'react';
import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getRepositories } from '../../store/repositoriesThunks';
import { selectFetchRepositoriesLoading } from '../../store/repositoriesSlice';

const Repositories = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fetchRepositoriesLoading = useAppSelector(selectFetchRepositoriesLoading);

  useEffect(() => {
    dispatch(getRepositories());
    if (location.pathname === '/repositories') {
      navigate('public', { replace: true });
    }
  }, [location, dispatch, navigate]);

  return !fetchRepositoriesLoading ? (
    <Box sx={{ mt: 3, px: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Paper elevation={1} sx={{ p: 1 }}>
            <Typography>
              <Button component={NavLink} to="public" sx={{ textDecoration: 'none', color: 'inherit' }}>
                Public repositories
              </Button>
            </Typography>
            <Typography>
              <Button component={NavLink} to="private" sx={{ textDecoration: 'none', color: 'inherit' }}>
                Private repositories
              </Button>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <LinearProgress />
  );
};

export default Repositories;
