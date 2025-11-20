import { Router } from 'express'
import { listTripsController, createTripController, getTripByIdController } from '../modules/trip/trip.controller.js'

const router = Router()

router.post('/', createTripController)

router.get('/', listTripsController)

router.get('/:id', getTripByIdController)

export const tripRouter = router
