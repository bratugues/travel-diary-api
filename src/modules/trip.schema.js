import { z } from 'zod'

export const createTripSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty'),
  description: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional()
})

export const updateTripSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional()
})
