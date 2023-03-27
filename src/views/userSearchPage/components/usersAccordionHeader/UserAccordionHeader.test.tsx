import React from 'react';
import { render } from '@testing-library/react';

import { MOCK_USER_INFO } from 'mocks';
import { UsersAccordionHeader } from './UserAccordionHeader';

const customRender = () =>
  render(<UsersAccordionHeader userInfo={MOCK_USER_INFO} />);

describe('User Accordion Header Component', () => {
  it('UsersAccordionHeader should render correct html', async () => {
    const { container } = customRender();
    const wrapper = container.querySelector('.user-accordion-header');
    const img = container.querySelector<HTMLInputElement>('img');
    const h2 = container.querySelector<HTMLInputElement>('h2');
    expect(wrapper).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img?.src).toBe(MOCK_USER_INFO.avatar_url);
    expect(h2).toBeInTheDocument();
    expect(h2?.textContent).toBe(MOCK_USER_INFO.login);
  });
});
