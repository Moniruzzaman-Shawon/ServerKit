import { vi } from 'vitest'

// Mock Next.js server-only modules so lib files can be imported in tests
vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn().mockReturnValue(undefined),
  })),
}))
