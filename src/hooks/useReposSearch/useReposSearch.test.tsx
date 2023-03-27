import React, { FC, ReactElement } from 'react';
import { waitFor, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { USERS, REPOS } from 'mocks';

import { useReposSearch } from './useReposSearch';

const queryClient = new QueryClient();
const wrapper: FC<{ children: ReactElement }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useReposSearch Hook', () => {
  it('Should fetch data', async () => {
    const { result } = renderHook(
      () => useReposSearch({ url: USERS[0].repos_url }),
      {
        wrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toStrictEqual(REPOS);
    });
  });
});
