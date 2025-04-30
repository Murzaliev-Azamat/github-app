import React from 'react';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolBar from './components/UI/AppToolBar/AppToolBar';
import Home from './pages/Home/Home';
import GitHubCallback from './pages/GitHubCallback/GitHubCallback';
import Repositories from './pages/Repositories/Repositories';
import PublicRepositories from './pages/Repositories/PublicRepositories';
import PrivateRepositories from './pages/Repositories/PrivateRepositories';

function App() {
  return (
    <Box>
      <AppToolBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<GitHubCallback />} />
        <Route path="/repositories" element={<Repositories />}>
          <Route path="public" element={<PublicRepositories />} />
          <Route path="private" element={<PrivateRepositories />} />
        </Route>
        <Route path="*" element={<span>Такой страницы не существует</span>} />
      </Routes>
    </Box>
  );
}

export default App;
