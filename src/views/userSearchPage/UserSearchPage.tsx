import React, { FC } from 'react';
import classNames from 'classnames';

import './UserSearchPage.scss';
import { UserSearchForm, UserSearchResult } from './components';

export const UserSearchPage: FC = () => {
  return (
    <div className="app-page user-search-page">
      <div className="user-search-form_wrapper">
        <UserSearchForm />
      </div>
      <div className="user-search-result_wrapper">
        <UserSearchResult />
      </div>
    </div>
  );
};
