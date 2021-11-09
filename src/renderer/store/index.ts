import { configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import storage from 'redux-persist/lib/storage';

import rootReducer from './features';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  stateReconciler: hardSet,
  whiteList: ['layout'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
