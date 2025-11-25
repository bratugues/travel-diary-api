import { registerUser, loginUser } from "../../services/authService";

export const registerController = async (req, res, next) => {
  try {
    const newUser = await registerUser(req.body)
    return res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}

export const loginController = async (req, res, next) => {
  try {
    const tokenData = await loginUser(req.body)
    return res.status(201).json(tokenData)
  } catch (error) {
    next(error)
  }
}

export const meController = async (req, res) => {
  return res.json({
    message: "You are authenticated",
    yourId: req.userId
  })
}
