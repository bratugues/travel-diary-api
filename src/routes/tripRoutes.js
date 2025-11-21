import { Router } from 'express'
import { listTripsController, createTripController, getTripByIdController, updateTripController, deleteTripController } from '../modules/trip/trip.controller.js'

const router = Router()

router.post('/', createTripController)

router.get('/', listTripsController)

router.get('/:id', getTripByIdController)

router.patch('/:id', updateTripController)

router.delete('/:id', deleteTripController)

export const tripRouter = router
