import { Empty } from 'antd';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { UsersAccordion } from '../usersAccordion';

export const UserSearchResult: FC = () => {
  const { userName } = useParams();
  if (userName) {
    return <UsersAccordion userName={userName} />;
  }

  return <Empty description="Please provide user name" />;
};
