import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  act,
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';

import { AppRouting } from 'consts';
import { UserSearchForm } from './UserSearchForm';

const customRender = () =>
  render(
    <MemoryRouter initialEntries={['/users/test']}>
      <Routes>
        <Route
          path={AppRouting.USER_SEARCH_RESULT_PAGE}
          element={<UserSearchForm />}
        />
        <Route
          path={AppRouting.USER_SEARCH_PAGE}
          element={<div data-testid="test" />}
        />
      </Routes>
    </MemoryRouter>
  );

describe('User Search Form Component', () => {
  it('UserSearchForm should render correct html and change route', async () => {
    const { container } = customRender();
    const form = container.querySelector('#username-search');
    const button = container.querySelector('button[type="submit"]');
    const input = container.querySelector<HTMLInputElement>(
      '#username-search_userName'
    );
    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input?.value).toEqual('test');
    expect(button).toBeInTheDocument();
    expect(button?.textContent).toEqual('Search');

    act(() => {
      if (input) fireEvent.change(input, { target: { value: '' } });
      if (button) userEvent.click(button);
    });

    await waitFor(() => expect(screen.getByTestId('test')).toBeInTheDocument());
  });
});
