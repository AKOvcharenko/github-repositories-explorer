import { waitFor, act } from '@testing-library/react';

describe('index', () => {
  it('renders without crashing', async () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);

    act(() => {
      require('./index.tsx');
    });

    await waitFor(() => {
      expect(
        document.querySelector('#root .app-container')
      ).toBeInTheDocument();
    });
  });
});
