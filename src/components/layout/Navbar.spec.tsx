import { render } from '@testing-library/react';
import NavbarComponent from './Navbar';
import { describe, vi, test } from 'vitest'
import { AuthContext } from '../../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('NavbarComponent', () => {
  test('should render correctly with context', () => {
    const mockContextValue = {
      isAuthenticated: true,
      logout: vi.fn(),
      user: { email: 'email@test.com' },
      loading: false,
      login: vi.fn(),
    };

    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockContextValue}>
          <NavbarComponent />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  });

  test('should render correctly without authentication', () => {
    const mockContextValue = {
      isAuthenticated: false,
      logout: vi.fn(),
      user: { email: 'email@test.com' },
      loading: false,
      login: vi.fn(),
    };

    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockContextValue}>
          <NavbarComponent />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  })
});