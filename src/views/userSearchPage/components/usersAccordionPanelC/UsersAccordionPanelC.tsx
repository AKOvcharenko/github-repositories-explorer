import React, { FC } from 'react';
import { StarFilled } from '@ant-design/icons';
import { Skeleton, Card, Empty, Space } from 'antd';

import { useReposSearch } from 'hooks';
import { User, Repository } from 'models';

import './UsersAccordionPanelC.scss';

const CardTitle: FC<{ repoInfo: Repository }> = ({ repoInfo }) => (
  <div className="repo-card-title">
    <span>{repoInfo.name}</span>
    <span>
      <Space size={5}>
        <span>{repoInfo.stargazers_count}</span>
        <StarFilled style={{ color: 'gold' }} />
      </Space>
    </span>
  </div>
);

const RepoCard: FC<{ repoInfo: Repository }> = ({ repoInfo }) => (
  <Card
    bordered={false}
    className="repo-card"
    title={<CardTitle repoInfo={repoInfo} />}
  >
    {repoInfo.description || 'No Description provided'}
  </Card>
);

export const UsersAccordionPanel: FC<{ userInfo: User }> = ({ userInfo }) => {
  const { data } = useReposSearch({ url: userInfo.repos_url });

  if (!data) return <Skeleton active />;
  if (!data.length) return <Empty description="User has no repositories" />;

  return (
    <div className="user-accordion-panel">
      {data.map((repoInfo) => (
        <RepoCard key={repoInfo.id} repoInfo={repoInfo} />
      ))}
    </div>
  );
};
