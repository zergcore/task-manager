import { render } from '@testing-library/react';
import LoginPage from './LoginPage';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('LoginPage', () => {
  test('should match snapshot', () => {
    const queryClient = new QueryClient();
    const { asFragment } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </QueryClientProvider>

    );

    expect(asFragment()).toMatchSnapshot();
  });
});