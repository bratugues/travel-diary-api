import { Router } from 'express'
import { registerController, loginController, meController } from '../modules/auth/auth.controller.js'
import { protect } from '../middlewares/authMiddleware.js'

const authRouter = Router()

authRouter.post('/register', registerController)
authRouter.post('/login', loginController)
authRouter.get('/me', protect, meController)

export { authRouter }
