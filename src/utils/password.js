import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10

export const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS)
  return hash
}

export const comparePassword = async (plainPassword, hashedPassword) => {
  const match = await bcrypt.compare(plainPassword, hashedPassword)
  return match
}
