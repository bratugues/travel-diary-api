import { vi } from 'vitest'

export const prismaMock = {
  trip: {
    create: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  }
}
