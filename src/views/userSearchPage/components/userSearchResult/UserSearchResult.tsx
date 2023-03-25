import { Empty } from 'antd';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

export const UserSearchResult: FC = () => {
  const { userId } = useParams();
  if (userId) {
    return <div>userName is {userId}</div>;
  }

  return <Empty description="Please provide user name" />;
};
