import { Provider } from 'react-redux';
import React, { FC, ReactElement } from 'react';
import { waitFor, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { store } from 'store';
import { USERS, REPOS } from 'mocks';

import { useReposSearch } from './useReposSearch';

const queryClient = new QueryClient();
const wrapper: FC<{ children: ReactElement }> = ({ children }) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </Provider>
);

describe('useReposSearch Hook', () => {
  it('Should fetch data', async () => {
    const { result } = renderHook(
      () =>
        useReposSearch({
          url: USERS[0].repos_url,
          userName: USERS[0].login,
        }),
      {
        wrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.isFetching).toBe(true);
      expect(store.getState().reposSlice.repos[USERS[0].login].loading).toBe(
        true
      );
    });

    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
      expect(
        store.getState().reposSlice.repos[USERS[0].login].loading
      ).toStrictEqual(false);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toStrictEqual(REPOS);
      expect(
        store.getState().reposSlice.repos[USERS[0].login].repositories
      ).toStrictEqual(REPOS);
    });
  });
});
