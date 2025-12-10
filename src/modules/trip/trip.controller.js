import { createTrip, deleteTrip, getTripById, listTrips, updateTrip, listFavoriteTrips } from "../../services/tripService.js"
import { uploadImage } from "../../lib/cloudinary.js"

export const createTripController = async (req, res, next) => {
  const input = req.body
  const file = req.file
  const userId = req.userId
  try {
    const newTrip = await createTrip(userId, input, file)
    return res.status(201).json(newTrip)
  } catch (error) {
    next(error)
  }
}

export const listTripsController = async (req, res, next) => {
  try {
    const userId = req.userId
    const { search } = req.query
    const trips = await listTrips(userId, search)
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
  let input = req.body
  const userId = req.userId
  const file = req.file

  if(file){
    input = {...input, imageUrl: await uploadImage(file.buffer)}
  }

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

export const listFavoriteTripsController = async (req, res, next) => {
  try {
    const userId = req.userId
    const favoriteTrips = await listFavoriteTrips(userId)
    return res.json(favoriteTrips)
  } catch (error) {
    next(error)
  }
}
