import {
  AnyAction,
  ThunkDispatch,
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { reposSlice } from './reposSlice';
import { usersSlice } from './usersSlice';
import { setCustomAxiosHeaderCreator } from './middlewares';

const rootReducer = combineReducers({
  usersSlice,
  reposSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    setCustomAxiosHeaderCreator(process.env.REACT_APP_AUTH_HEADER),
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
