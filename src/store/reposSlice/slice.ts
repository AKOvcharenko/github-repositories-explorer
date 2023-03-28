import { createSlice } from '@reduxjs/toolkit';

import { ReposState } from './model';
import { storeRepos, clearRepos, storeReposRequestState } from './reducers';

const initialState: ReposState = {
  repos: {},
};

const reposState = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    storeRepos,
    clearRepos,
    storeReposRequestState,
  },
});

export const reposSlice = reposState.reducer;
export const {
  storeRepos: storeReposAction,
  clearRepos: clearReposAction,
  storeReposRequestState: storeReposRequestStateAction,
} = reposState.actions;
