import { Router } from 'express'

const router = Router()

router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Travel Diary API up and running!' })
})

export default router
