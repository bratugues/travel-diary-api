import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/index.js'
import { tripRouter } from './routes/tripRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api', router)
app.use('/trips', tripRouter)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({message: err.message || 'Internal server error...'})
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
