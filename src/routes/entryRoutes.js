import { Router } from 'express'
import { deleteEntryController, createEntryController, updateEntryController, getEntryByIdController, listEntriesByTripIdController } from '../modules/entry/entry.controller'


const router = Router()

router.post('/trips/:tripId/entries', createEntryController)

router.get('/trips/:tripId/entries', listEntriesByTripIdController)

router.get('/:id', getEntryByIdController)

router.patch('/:id', updateEntryController)

router.delete('/:id', deleteEntryController)
export const entryRouter = router
