import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../pages/users/usersSlise';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import { authReducer } from '../pages/users/authSlice';

const authPersistConfig = {
  key: 'test-attractor:auth',
  storage,
  whitelist: ['accessToken'],
};

const rootReducer = combineReducers({
  users: usersReducer,
  auth: persistReducer(authPersistConfig, authReducer),
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
