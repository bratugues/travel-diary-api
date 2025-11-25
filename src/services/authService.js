import { prisma } from '../lib/prisma.js'
import { hashPassword } from '../utils/password.js'
import { registerSchema } from '../modules/auth/auth.schema.js'

export const registerUser = async (input) => {
  const result = registerSchema.safeParse(input)

  if (!result.success){
    throw result.error
  }

  const { name, email, password } = result.data

  const existingUser = await prisma.user.findUnique({where: email})

  if(existingUser){
    throw new Error("Email already in use")
  }

  const hashedPassword = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  const { password: _, ...userWithoutPassword } = user

  return userWithoutPassword
}
