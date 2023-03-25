import { Button } from 'antd';
import React, { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const UserSearchPage: FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      Parametr is {userId}
      <Button
        type="primary"
        onClick={() => navigate(`/users/${Math.random()}`)}
      >
        Change Parametr
      </Button>
    </>
  );
};
