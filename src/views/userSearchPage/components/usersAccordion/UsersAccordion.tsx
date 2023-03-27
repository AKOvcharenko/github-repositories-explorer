import React, { FC } from 'react';
import { Spin, Collapse, Empty } from 'antd';

import { useUserSearch } from 'hooks';

import './UsersAccordion.scss';
import { UsersAccordionPanel } from '../usersAccordionPanelC';
import { UsersAccordionHeader } from '../usersAccordionHeader';

const { Panel } = Collapse;

export const UsersAccordion: FC<{ userName: string }> = ({ userName }) => {
  const { data, isLoading } = useUserSearch({ userName });

  if (isLoading) {
    return <Spin className="users-accordion-spin" size="large" />;
  }

  if (!isLoading && data?.length === 0) {
    return <Empty description="Nothing is here, try another user name" />;
  }

  return (
    <div className="users-accordion">
      <Collapse
        key={userName}
        bordered={false}
        defaultActiveKey={['0']}
        expandIconPosition="end"
      >
        {data?.map((userInfo, index) => (
          <Panel
            key={index}
            header={<UsersAccordionHeader userInfo={userInfo} />}
          >
            <UsersAccordionPanel userInfo={userInfo} />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
