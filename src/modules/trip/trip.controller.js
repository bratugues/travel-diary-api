import { createTrip, deleteTrip, getTripById, listTrips, updateTrip } from "../../services/tripService.js"

export const createTripController = async (req, res, next) => {
  const input = req.body
  const userId = req.userId
  try {
    const newTrip = await createTrip(userId, input)
    return res.status(201).json(newTrip)
  } catch (error) {
    next(error)
  }
}

export const listTripsController = async (req, res, next) => {
  try {
    const userId = req.userId
    const trips = await listTrips(userId)
    return res.json(trips)
  } catch (error) {
    next(error)
  }
}

export const getTripByIdController = async (req, res, next) => {
  const { id } = req.params
  const userId = req.userId
  try {
    const trip = await getTripById(id, userId)
    return res.json(trip)
  } catch (error) {
    next(error)
  }
}

export const updateTripController = async (req, res, next) => {
  const { id } = req.params
  const input = req.body
  const userId = req.userId
  try {
    const updatedTrip = await updateTrip(id, input, userId)
    return res.json(updatedTrip)
  } catch (error) {
    next(error)
  }
}

export const deleteTripController = async (req, res, next) => {
  const { id } = req.params
  const userId = req.userId
  try {
    const deletedTrip = await deleteTrip(id, userId)
    return res.json(deletedTrip)
  } catch (error) {
    next(error)
  }
}
