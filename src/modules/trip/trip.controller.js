import { createTrip, deleteTrip, getTripById, listTrips, updateTrip } from "../../services/tripService.js"

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

export const updateTripController = async (req, res, next) => {
  const { id } = req.params
  const input = req.body
  try {
    const updatedTrip = await updateTrip(id, input)
    return res.json(updatedTrip)
  } catch (error) {
    next(error)
  }
}

export const deleteTripController = async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedTrip = await deleteTrip(id)
    return res.json(deletedTrip)
  } catch (error) {
    next(error)
  }
}
