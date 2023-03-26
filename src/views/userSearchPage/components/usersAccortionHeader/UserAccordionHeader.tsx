import React, { FC } from 'react';
import { Avatar, Space } from 'antd';

import { User } from 'models';

const sizes = { xxl: 48, xl: 48, lg: 48, md: 48, sm: 64, xs: 64 };

export const UsersAccordionHeader: FC<{ userInfo: User }> = ({ userInfo }) => {
  return (
    <div>
      <Space wrap size={16}>
        <Avatar size={sizes} src={userInfo.avatar_url} shape="square" />
        <h2>{userInfo.login}</h2>
      </Space>
    </div>
  );
};
