import { get } from 'lodash-es';
import { PayloadAction } from '@reduxjs/toolkit';

import { Repository } from 'models';

import { ReposState } from '../model';

export const storeRepos = (
  state: ReposState,
  { payload }: PayloadAction<{ [userName: string]: Repository[] }>
) => {
  const [userName, repositories] = Object.entries(payload)[0];
  return {
    repos: {
      ...state.repos,
      [userName]: {
        repositories,
        loading: get(state, ['repos', userName, 'loading'], false),
      },
    },
  };
};

export const storeReposRequestState = (
  state: ReposState,
  { payload }: PayloadAction<{ [userName: string]: boolean }>
) => {
  const [userName, reqState] = Object.entries(payload)[0];
  return {
    repos: {
      ...state.repos,
      [userName]: {
        loading: reqState,
        repositories: get(state, ['repos', userName, 'repositories'], []),
      },
    },
  };
};

export const clearRepos = () => ({ repos: {} });
