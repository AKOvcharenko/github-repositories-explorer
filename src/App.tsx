import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

import { NotFoundPage, UserSearchPage } from 'views';

import './App.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const App: FC = () => {
  return (
    <div className="app-container">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/users/:userName" element={<UserSearchPage />} />
            <Route path="/users" element={<UserSearchPage />} />
            <Route
              path="/"
              element={<Navigate to="/users/" replace={true} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};
