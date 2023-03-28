import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type OpenNotification = (settings: {
  message: string;
  description: string;
  type: NotificationType;
}) => void;

export const openNotification: OpenNotification = ({
  type,
  message,
  description,
}) => {
  notification.open({ type, message, description, placement: 'bottomRight' });
};
