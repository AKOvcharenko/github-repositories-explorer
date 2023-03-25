import { Button, Form, Input } from 'antd';
import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

export const UserSearchForm: FC = () => {
  const navigate = useNavigate();
  const onSubmit = useMemo(
    () =>
      ({ username = '' }: { username: string }) =>
        navigate(`/users/${username}`),
    []
  );

  return (
    <Form name="username-search" onFinish={onSubmit}>
      <Form.Item name="username">
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          allowClear={true}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block={true}>
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};
