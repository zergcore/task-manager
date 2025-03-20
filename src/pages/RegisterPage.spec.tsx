import { render } from '@testing-library/react';
import RegisterPage from './RegisterPage';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('RegisterPage', () => {
  test('should match snapshot', () => {
    const queryClient = new QueryClient();
    const { asFragment } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </QueryClientProvider>

    );

    expect(asFragment()).toMatchSnapshot();
  });
});