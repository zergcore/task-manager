import { render } from '@testing-library/react';
import { AuthContext } from '../context/AuthContext'; // Adjust the path as needed
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, test, expect } from 'vitest';
import HomePage from './HomePage';

describe('HomePage', () => {
  test('should match snapshot when authenticated', () => {
    const queryClient = new QueryClient();
    const mockContextValue = {
      isAuthenticated: true,
      logout: vi.fn(),
      user: { email: 'email@test.com' },
      loading: false,
      login: vi.fn(),
    };

    const {asFragment} = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AuthContext.Provider value={mockContextValue}>
            <HomePage />
          </AuthContext.Provider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('should match snapshot when not authenticated', () => {
    const queryClient = new QueryClient();
    const mockContextValue = {
      isAuthenticated: false,
      logout: vi.fn(),
      user: { email: 'email@test.com' },
      loading: false,
      login: vi.fn(),
    };

    const { asFragment } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AuthContext.Provider value={mockContextValue}>
            <HomePage />
          </AuthContext.Provider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});