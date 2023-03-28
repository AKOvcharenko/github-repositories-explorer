import userEvent from '@testing-library/user-event';
import { act, render, waitFor, fireEvent } from '@testing-library/react';

import { EMPTY_REPOS_USER_NAME, NON_EMPTY_REPOS_USER_NAME } from 'mocks';

import { App } from './App';

const customRender = () => render(<App />);

describe('App Component', () => {
  it('App workflow', async () => {
    const { container, debug } = customRender();
    const button = container.querySelector('button[type="submit"]');
    const input = container.querySelector<HTMLInputElement>(
      '#username-search_userName'
    );

    expect(container.querySelector('.user-search-page')).toBeInTheDocument();

    act(() => {
      if (input)
        fireEvent.change(input, {
          target: {
            value: `${NON_EMPTY_REPOS_USER_NAME}/${EMPTY_REPOS_USER_NAME}`,
          },
        });
      if (button) userEvent.click(button);
    });

    await waitFor(() => {
      expect(container.querySelector('.not-found-page')).toBeInTheDocument();
    });
  });
});
