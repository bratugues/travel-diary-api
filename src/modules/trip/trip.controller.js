import { createTrip, getTripById, listTrips } from "../../services/tripService.js"

export const createTripController = async (req, res, next) => {
  const input = req.body
  try {
    const newTrip = await createTrip(input)
    return res.status(201).json(newTrip)
  } catch (error) {
    next(error)
  }
}

export const listTripsController = async (req, res, next) => {
  try {
    const trips = await listTrips()
    return res.json(trips)
  } catch (error) {
    next(error)
  }
}

export const getTripByIdController = async (req, res, next) => {
  const { id } = req.params
  try {
    const trip = await getTripById(id)
    return res.json(trip)
  } catch (error) {
    next(error)
  }
}
