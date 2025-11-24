import { z } from 'zod'

export const createEntrySchema = z.object({
  title: z.string().optional(),
  content: z.string().nonempty(),
  date: z.coerce.date(),
})

export const updateEntrySchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  date: z.coerce.date().optional(),
})
