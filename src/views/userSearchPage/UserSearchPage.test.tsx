import {
  act,
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { store } from 'store';

import { AppRouting } from 'consts';
import { EMPTY_REPOS_USER_NAME, NON_EMPTY_REPOS_USER_NAME, USERS } from 'mocks';

import { UserSearchPage } from './UserSearchPage';

const queryClient = new QueryClient();
const customRender = () =>
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/users']}>
          <Routes>
            <Route
              path={AppRouting.USER_SEARCH_RESULT_PAGE}
              element={<UserSearchPage />}
            />
            <Route
              path={AppRouting.USER_SEARCH_PAGE}
              element={<UserSearchPage />}
            />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );

describe('UserSearchPage', () => {
  it('UserSearchPage workflow', async () => {
    const { container } = customRender();
    // User comes to page with empty form
    const searchResult = container.querySelector('.user-search-result_wrapper');
    const button = container.querySelector('button[type="submit"]');
    const input = container.querySelector<HTMLInputElement>(
      '#username-search_userName'
    );
    expect(searchResult?.textContent).toBe('Please provide user name');
    expect(input?.value).toEqual('');

    // User provides userName and submit form
    act(() => {
      if (input)
        fireEvent.change(input, {
          target: { value: NON_EMPTY_REPOS_USER_NAME },
        });
      if (button) userEvent.click(button);
    });

    await waitFor(() => {
      expect(
        container.querySelector('.users-accordion-spin')
      ).toBeInTheDocument();
    });

    // User sees results for provided userName
    await waitFor(() => {
      expect(container.querySelector('.users-accordion')).toBeInTheDocument();
      USERS.forEach(({ login }) =>
        expect(screen.getByText(login)).toBeInTheDocument()
      );
    });

    // User provides another userName and submit form
    act(() => {
      // form was rerendered need select elements one more time
      const nextInput = container.querySelector<HTMLInputElement>(
        '#username-search_userName'
      );
      const nextButton = container.querySelector('button[type="submit"]');
      if (nextInput) {
        fireEvent.change(nextInput, {
          target: { value: EMPTY_REPOS_USER_NAME },
        });
      }

      if (nextButton) userEvent.click(nextButton);
    });

    // User sees results for provided userName
    await waitFor(() => {
      expect(container.querySelector('.ant-empty')).toBeInTheDocument();
      expect(searchResult?.textContent).toBe(
        'Nothing is here, try another user name'
      );
    });
  });
});
