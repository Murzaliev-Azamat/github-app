import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../store/usersSlise';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import { authReducer } from '../store/authSlice';
import { repositoriesReducer } from '../store/repositoriesSlice';

const authPersistConfig = {
  key: 'test-attractor:auth',
  storage,
  whitelist: ['accessToken'],
};

const usersPersistConfig = {
  key: 'test-attractor:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  users: persistReducer(usersPersistConfig, usersReducer),
  repositories: repositoriesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
