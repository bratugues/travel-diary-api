import { Router } from 'express'
import { registerController, loginController, meController } from '../modules/auth/auth.controller'
import { protect } from '../middlewares/authMiddleware'

const authRouter = Router()

authRouter.post('/register', registerController)
authRouter.post('/login', loginController)
authRouter.get('/me', protect, meController)

export { authRouter }
