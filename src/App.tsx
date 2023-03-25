import React, { FC } from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

import { NotFoundPage, UserSearchPage } from 'views';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/:userId" element={<UserSearchPage />} />
        <Route path="/users" element={<UserSearchPage />} />
        <Route path="/" element={<Navigate to="/users/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
