import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { fetchAccessToken } from '../../store/authThunks';

const GitHubCallback = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const authorizeUser = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) return;

    try {
      await dispatch(fetchAccessToken(code)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Authorization error:', error);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    void authorizeUser();
  }, [authorizeUser]);

  return <div>Loading...</div>;
};

export default GitHubCallback;
