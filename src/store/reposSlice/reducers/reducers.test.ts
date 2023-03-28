import { cloneDeep, forOwn } from 'lodash-es';
import { USERS, REPOS } from 'mocks';

import {
  reposSlice,
  clearReposAction,
  storeReposAction,
  storeReposRequestStateAction,
} from '../slice';
import { ReposState } from '../model';

const initialState: ReposState = {
  repos: {
    [USERS[0].login]: {
      loading: false,
      repositories: [REPOS[0]],
    },
  },
};

const state = cloneDeep(initialState);

describe('reposSlice Reducers', () => {
  it('clearRepos should remove all repos info from state', async () => {
    const updatedState = reposSlice(state, clearReposAction());
    expect(updatedState).toStrictEqual({ repos: {} });
    expect(state).toStrictEqual(initialState);
  });

  it('storeReposAction should put provided data to state', async () => {
    const updatedState = reposSlice(
      state,
      storeReposAction({ [USERS[1].login]: [REPOS[1]] })
    );
    expect(updatedState.repos[USERS[0].login].repositories).toStrictEqual([
      REPOS[0],
    ]);
    expect(updatedState.repos[USERS[1].login].repositories).toStrictEqual([
      REPOS[1],
    ]);
    expect(state).toStrictEqual(initialState);
  });

  it('storeReposAction should put provided request status to state', async () => {
    const updatedState = reposSlice(
      state,
      storeReposRequestStateAction({ [USERS[0].login]: true })
    );
    expect(updatedState.repos[USERS[0].login].loading).toBe(true);
    expect(state).toStrictEqual(initialState);
  });
});
