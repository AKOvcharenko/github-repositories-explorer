import { Button, Form, Input } from 'antd';
import React, { FC, useMemo } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

export const UserSearchForm: FC = () => {
  const navigate = useNavigate();
  const { userName } = useParams();

  const onSubmit = useMemo(
    () => (values: { userName: string }) =>
      navigate(`/users/${values.userName || ''}`),
    [navigate]
  );

  return (
    <Form
      key={userName}
      name="username-search"
      onFinish={onSubmit}
      initialValues={{ userName }}
    >
      <Form.Item name="userName">
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
