import { Router } from 'express'
import { listTripsController, createTripController, getTripByIdController, updateTripController, deleteTripController } from '../modules/trip/trip.controller.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/', protect, createTripController)

router.get('/', protect, listTripsController)

router.get('/:id', protect, getTripByIdController)

router.patch('/:id', protect, updateTripController)

router.delete('/:id', protect, deleteTripController)

export const tripRouter = router
