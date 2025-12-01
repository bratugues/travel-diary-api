import { Router } from 'express'
import { deleteEntryController, createEntryController, updateEntryController, getEntryByIdController, listEntriesByTripIdController } from '../modules/entry/entry.controller'
import { protect } from '../middlewares/authMiddleware'
import { upload } from '../middlewares/uploadMiddleware'


const router = Router()

router.post('/trips/:tripId/entries', protect, upload.single('image'), createEntryController)

router.get('/trips/:tripId/entries', protect, listEntriesByTripIdController)

router.get('/entries/:id', protect, getEntryByIdController)

router.patch('/entries/:id', protect, updateEntryController)

router.delete('/entries/:id', protect, deleteEntryController)
export const entryRouter = router
