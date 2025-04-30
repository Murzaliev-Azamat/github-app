import React from 'react';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolBar from './components/UI/AppToolBar/AppToolBar';
import Home from './pages/Home/Home';
import GitHubCallback from './pages/GitHubCallback/GitHubCallback';

function App() {
  return (
    <div>
      <Box>
        <AppToolBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<GitHubCallback />} />
          <Route path="*" element={<span>Такой страницы не существует</span>} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
