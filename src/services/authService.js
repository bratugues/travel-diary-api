import { prisma } from '../lib/prisma.js'
import jwt from 'jsonwebtoken'
import { hashPassword, comparePassword } from '../utils/password.js'
import { registerSchema, loginSchema } from '../modules/auth/auth.schema.js'

export const registerUser = async (input) => {
  const result = registerSchema.safeParse(input)

  if (!result.success){
    throw result.error
  }

  const { name, email, password } = result.data

  const existingUser = await prisma.user.findUnique({where: { email }})

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

export const loginUser = async (input) => {
  const result = loginSchema.safeParse(input)
  if (!result.success) throw result.error

  const { email, password } = result.data

  const user = await prisma.user.findUnique({where: { email }})
  if(!user) throw new Error("Invalid credentials")

  const isPasswordValid = await comparePassword(password, user.password)

  if(!isPasswordValid) throw new Error("Invalid credentials")

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d'}
  )

  return {
    accessToken: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
}
