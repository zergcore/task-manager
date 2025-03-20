import '@testing-library/react'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Limpia el DOM después de cada test
afterEach(() => {
  cleanup()
})
