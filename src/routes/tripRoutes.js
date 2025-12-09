import { Router } from 'express'
import { listTripsController, createTripController, getTripByIdController, updateTripController, deleteTripController, listFavoriteTripsController } from '../modules/trip/trip.controller.js'
import { protect } from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/uploadMiddleware.js'

const router = Router()

router.post('/', protect, upload.single('image'), createTripController)

router.get('/', protect, listTripsController)

router.get('/favorites', protect, upload.single('image'), listFavoriteTripsController)

router.get('/:id', protect, getTripByIdController)

router.patch('/:id', protect, upload.single('image'), updateTripController)

router.delete('/:id', protect, deleteTripController)

export const tripRouter = router
