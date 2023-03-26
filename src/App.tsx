import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

import { AppRouting } from 'consts';
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
            <Route
              path={AppRouting.USER_SEARCH_RESULT_PAGE}
              element={<UserSearchPage />}
            />
            <Route
              path={AppRouting.USER_SEARCH_PAGE}
              element={<UserSearchPage />}
            />
            <Route
              path={AppRouting.ROOT}
              element={
                <Navigate to={AppRouting.USER_SEARCH_PAGE} replace={true} />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};
