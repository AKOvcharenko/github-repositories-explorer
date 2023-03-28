import React, { FC } from 'react';
import { Spin, Collapse, Empty } from 'antd';

import { useUserSearch } from 'hooks';

import './UsersAccordion.scss';
import { UsersAccordionPanel } from '../usersAccordionPanelC';
import { UsersAccordionHeader } from '../usersAccordionHeader';

const { Panel } = Collapse;

export const UsersAccordion: FC<{ userName: string }> = ({ userName }) => {
  // For now i purposely use "data" and "isFetching" from react-query but not from redux store
  // because it just used for direct view rendering
  // in case if data needs to be somehow modified it should be taken from redux store
  const { data, isFetching } = useUserSearch({ userName });

  if (!isFetching && data?.length === 0) {
    return <Empty description="Nothing is here, try another user name" />;
  }

  return (
    <>
      {isFetching && <Spin className="users-accordion-spin" size="large" />}
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
    </>
  );
};
