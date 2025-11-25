import { registerUser } from "../../services/authService";

export const registerController = async (req, res, next) => {
  try {
    const newUser = await registerUser(req.body)
    return res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}
