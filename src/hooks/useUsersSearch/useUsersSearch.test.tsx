import { Provider } from 'react-redux';
import React, { FC, ReactElement } from 'react';
import { waitFor, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { store } from 'store';
import { USERS, NON_EMPTY_REPOS_USER_NAME } from 'mocks';

import { useUserSearch } from './useUsersSearch';

const queryClient = new QueryClient();
const wrapper: FC<{ children: ReactElement }> = ({ children }) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </Provider>
);

describe('useUserSearch Hook', () => {
  it('Should fetch data', async () => {
    const { result } = renderHook(
      () => useUserSearch({ userName: NON_EMPTY_REPOS_USER_NAME }),
      {
        wrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toStrictEqual(USERS);
    });
  });
});
