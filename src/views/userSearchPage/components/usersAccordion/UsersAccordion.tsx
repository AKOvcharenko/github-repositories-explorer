import React, { FC } from 'react';
import { Spin, Collapse, Empty } from 'antd';

import { useUserSearch } from 'hooks';

import './UsersAccordion.scss';
import { UsersAccordionHeader } from '../usersAccortionHeader';

const { Panel } = Collapse;

export const UsersAccordion: FC<{ userName: string }> = ({ userName }) => {
  const { data, isLoading } = useUserSearch({ userName });

  if (!isLoading && data?.length === 0) {
    return <Empty description="Nothing is here, try another user name" />;
  }

  return (
    <div className="users-accordion">
      {isLoading && <Spin className="users-accordion-spin" size="large" />}
      <Collapse
        bordered={false}
        defaultActiveKey={['0']}
        expandIconPosition="end"
      >
        {data?.map((userInfo, index) => (
          <Panel
            key={index}
            header={<UsersAccordionHeader userInfo={userInfo} />}
          >
            <p>elo</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
