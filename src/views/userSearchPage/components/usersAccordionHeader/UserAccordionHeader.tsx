import React, { FC } from 'react';

import { User } from 'models';

import './UserAccordionHeader.scss';

export const UsersAccordionHeader: FC<{ userInfo: User }> = ({ userInfo }) => {
  return (
    <div className="user-accordion-header">
      <div className="user-accordion-avatar">
        <img src={userInfo.avatar_url} alt={`avatar for ${userInfo.login}`} />
      </div>
      <h2>{userInfo.login}</h2>
    </div>
  );
};
