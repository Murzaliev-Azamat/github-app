import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectRepositories } from '../../store/repositoriesSlice';
import { Link, Paper, Typography } from '@mui/material';

const PublicRepositories = () => {
  const repositories = useAppSelector(selectRepositories);

  return (
    <>
      {repositories
        .filter((repository) => !repository.private)
        .map((repository) => (
          <Paper key={repository.id} elevation={2} sx={{ p: 1, mb: 1 }}>
            <Typography>{repository.name}</Typography>
            <Typography sx={{ mb: 1 }}>
              <Link href={repository.html_url} target="_blank" rel="noopener noreferrer">
                {repository.html_url}
              </Link>
            </Typography>
            <Typography>{repository.owner.login}</Typography>
            <Typography>
              <Link href={repository.owner.html_url} target="_blank" rel="noopener noreferrer">
                {repository.owner.html_url}
              </Link>
            </Typography>
          </Paper>
        ))}
    </>
  );
};

export default PublicRepositories;
