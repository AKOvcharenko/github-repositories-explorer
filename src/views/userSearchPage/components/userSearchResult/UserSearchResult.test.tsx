import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, waitFor, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { store } from 'store';
import { AppRouting } from 'consts';
import { NON_EMPTY_REPOS_USER_NAME, USERS } from 'mocks';

import { UserSearchResult } from './UserSearchResult';

const queryClient = new QueryClient();
const customRender = (appUrl: string) =>
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[appUrl]}>
          <Routes>
            <Route
              path={AppRouting.USER_SEARCH_RESULT_PAGE}
              element={<UserSearchResult />}
            />
            <Route
              path={AppRouting.USER_SEARCH_PAGE}
              element={<UserSearchResult />}
            />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );

describe('User Search Result Component', () => {
  it('UserSearchResult should render correct html for non empty data', async () => {
    const { container, debug } = customRender(
      `/users/${NON_EMPTY_REPOS_USER_NAME}`
    );

    await waitFor(() => {
      expect(container.querySelector('.users-accordion')).toBeInTheDocument();
    });

    USERS.forEach(({ login }) =>
      expect(screen.getByText(login)).toBeInTheDocument()
    );
  });

  it('UserSearchResult should render correct html for empty userName parameter', async () => {
    const { container } = customRender('/users');
    expect(container.querySelector('.ant-empty')).toBeInTheDocument();
    expect(screen.getByText('Please provide user name')).toBeInTheDocument();
  });
});
