import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, InputBase, LinearProgress, Link, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAnotherUserRepositories, getAnotherUsersBySearch } from '../../store/anotherUsersThunks';
import {
  selectAnotherUserRepositories,
  selectAnotherUsers,
  selectFetchAnotherUserRepositoriesLoading,
  selectFetchAnotherUsersBySearchLoading,
} from '../../store/anotherUsersSlice';

const AnotherUsers = () => {
  const dispatch = useAppDispatch();
  const anotherUsers = useAppSelector(selectAnotherUsers);
  const anotherUserRepositories = useAppSelector(selectAnotherUserRepositories);
  const fetchAnotherUsersBySearchLoading = useAppSelector(selectFetchAnotherUsersBySearchLoading);
  const fetchAnotherUserRepositoriesLoading = useAppSelector(selectFetchAnotherUserRepositoriesLoading);

  const [localSearch, setLocalSearch] = useState('');
  const [selectedLogin, setSelectedLogin] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localSearch.trim()) {
        setPage(1);
        dispatch(getAnotherUsersBySearch({ search: localSearch, page: 1 }));
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [localSearch, dispatch]);

  const getNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(getAnotherUsersBySearch({ search: localSearch, page: nextPage }));
  };

  const getPreviousPage = () => {
    const previousPage = page - 1;
    setPage(previousPage);
    dispatch(getAnotherUsersBySearch({ search: localSearch, page: previousPage }));
  };

  const onLoginClick = async (login: string, url: string) => {
    setSelectedLogin(login);
    await dispatch(getAnotherUserRepositories(url));
  };

  const items = 'items' in anotherUsers ? anotherUsers.items : [];

  const maxPage = Math.ceil(anotherUsers.total_count / 5);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: '2px 8px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
          mt: 3,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Поиск по пользователям"
          inputProps={{ 'aria-label': 'поиск по пользователям' }}
          onChange={onTextFieldChange}
          value={localSearch}
        />
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Typography sx={{ p: 1, mt: 2, textAlign: 'center' }}>
        Общее количество найденых пользователей: {localSearch !== '' ? anotherUsers.total_count : 0}
      </Typography>
      {fetchAnotherUsersBySearchLoading ? (
        <LinearProgress sx={{ maxWidth: 600, mx: 'auto' }} />
      ) : items.length > 0 && localSearch !== '' ? (
        items.map((anotherUser) => (
          <Paper key={anotherUser.id} elevation={2} sx={{ p: 1, mt: 2, maxWidth: 600, mx: 'auto' }}>
            <Typography
              onClick={() => onLoginClick(anotherUser.login, anotherUser.repos_url)}
              sx={{
                cursor: 'pointer',
                transition: 'color 0.3s',
                '&:hover': {
                  color: 'gray',
                },
                '&:active': {
                  color: 'green',
                },
              }}
            >
              {anotherUser.login}
            </Typography>
            {anotherUser.login === selectedLogin &&
              (fetchAnotherUserRepositoriesLoading ? (
                <LinearProgress />
              ) : (
                anotherUserRepositories.map((anotherUserRepository) => (
                  <Box key={anotherUserRepository.id}>
                    <Typography>
                      <Link href={anotherUserRepository.html_url} target="_blank" rel="noopener noreferrer">
                        {anotherUserRepository.html_url}
                      </Link>
                    </Typography>
                  </Box>
                ))
              ))}
          </Paper>
        ))
      ) : null}
      {items.length > 0 && localSearch !== '' && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: 600, mx: 'auto', mt: 2 }}>
          {page > 1 && !fetchAnotherUsersBySearchLoading ? (
            <Button variant="outlined" onClick={getPreviousPage}>
              Предыдущая страница
            </Button>
          ) : null}
          {!fetchAnotherUsersBySearchLoading && page < maxPage && (
            <Button sx={{ ml: 'auto' }} variant="contained" onClick={getNextPage}>
              Следующая страница
            </Button>
          )}
        </Box>
      )}
    </>
  );
};

export default AnotherUsers;
