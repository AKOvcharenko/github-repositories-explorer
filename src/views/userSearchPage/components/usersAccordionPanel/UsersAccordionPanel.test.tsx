import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { User } from 'models';
import { USERS, REPOS } from 'mocks';

import { UsersAccordionPanel } from './usersaccordionpanel';

const queryClient = new QueryClient();
const customRender = (userName: User) =>
  render(
    <QueryClientProvider client={queryClient}>
      <UsersAccordionPanel userInfo={userName} />
    </QueryClientProvider>
  );

describe('Users Accordion Panel Component', () => {
  it('UsersAccordionPanel should render correct html for non empty data', async () => {
    const { container } = customRender(USERS[0]);
    await waitFor(() => {
      expect(
        container.querySelector('.user-accordion-panel')
      ).toBeInTheDocument();
    });
    const repoCards = container.querySelectorAll('.repo-card');
    expect(repoCards.length).toEqual(REPOS.length);
    REPOS.forEach(({ name, description, stargazers_count }, index) => {
      const card = repoCards[index];
      expect(card.querySelector('.ant-card-head-title')?.textContent).toEqual(
        `${name}${stargazers_count}`
      );
      expect(card.querySelector('.ant-card-body')?.textContent).toEqual(
        description || 'No Description provided'
      );
    });
  });

  it('UsersAccordionPanel should render correct html for empty data', async () => {
    const { container } = customRender(USERS[1]);
    const skeleton = container.querySelector('.ant-skeleton');
    expect(skeleton).toBeInTheDocument();
    await waitFor(() => {
      expect(container.querySelector('.ant-empty')).toBeInTheDocument();
      expect(screen.getByText('User has no repositories')).toBeInTheDocument();
      expect(skeleton).not.toBeInTheDocument();
    });
  });
});
