import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { USERS, EMPTY_REPOS_USER_NAME, NON_EMPTY_REPOS_USER_NAME } from 'mocks';
import { UsersAccordion } from './UsersAccordion';

const queryClient = new QueryClient();
const customRender = (userName: string) =>
  render(
    <QueryClientProvider client={queryClient}>
      <UsersAccordion userName={userName} />
    </QueryClientProvider>
  );

describe('User Accordion Component', () => {
  it('UsersAccordion should render correct html for non empty data', async () => {
    const { container } = customRender(NON_EMPTY_REPOS_USER_NAME);
    const spiner = container.querySelector('.users-accordion-spin');
    expect(spiner).toBeInTheDocument();
    expect(spiner).toHaveClass('ant-spin ant-spin-lg');

    await waitFor(() => {
      expect(container.querySelector('.users-accordion')).toBeInTheDocument();
      expect(spiner).not.toBeInTheDocument();
      USERS.forEach(({ login }) =>
        expect(screen.getByText(login)).toBeInTheDocument()
      );
    });
  });

  it('UsersAccordion should render correct html for empty data', async () => {
    const { container } = customRender(EMPTY_REPOS_USER_NAME);
    await waitFor(() => {
      expect(container.querySelector('.ant-empty')).toBeInTheDocument();
      expect(
        screen.getByText('Nothing is here, try another user name')
      ).toBeInTheDocument();
    });
  });
});
