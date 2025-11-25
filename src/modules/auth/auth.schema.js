import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid e-mail format"),
  password: z.string().min(6, "Password must be at least 6 characters long")
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})
