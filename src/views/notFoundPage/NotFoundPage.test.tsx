import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, act, waitFor } from '@testing-library/react';

import { AppRouting } from 'consts';
import { NotFoundPage } from './NotFoundPage';

const customRender = () =>
  render(
    <MemoryRouter initialEntries={['/404']}>
      <Routes>
        <Route path={AppRouting.ROOT} element={<>Root</>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>
  );

describe('Not Found Page', () => {
  it('Not Found Page should render correct html', () => {
    customRender();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText('Sorry, the page you visited does not exist.')
    ).toBeInTheDocument();
    expect(screen.getByText('Back Home')).toBeInTheDocument();
  });

  it('Back button should lead to root', async () => {
    const { container, debug } = customRender();
    const link = container.querySelector('a');
    act(() => {
      if (link) userEvent.click(link);
    });

    await waitFor(() => expect(screen.getByText('Root')).toBeInTheDocument());
  });
});
