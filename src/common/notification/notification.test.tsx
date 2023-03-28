import React, { useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';

import { openNotification } from './notification';

const MESSAGE = 'MESSAGE';
const DESCRIPTION = 'DESCRIPTION';

const WrapperComponent = () => {
  useEffect(() => {
    openNotification({
      type: 'error',
      message: MESSAGE,
      description: DESCRIPTION,
    });
  }, []);

  return <></>;
};

const customRender = () => render(<WrapperComponent />);

describe('Notification function', () => {
  it('Notification function should render propper html', async () => {
    customRender();
    await waitFor(() => {
      const message = document.querySelector(
        '.ant-notification-notice-message'
      );
      const description = document.querySelector(
        '.ant-notification-notice-description'
      );

      const typeIndicator = document.querySelector(
        '[aria-label="close-circle"]'
      );
      expect(message).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(message?.textContent).toBe(MESSAGE);
      expect(description?.textContent).toBe(DESCRIPTION);
      expect(typeIndicator).toBeInTheDocument();
    });
  });
});
