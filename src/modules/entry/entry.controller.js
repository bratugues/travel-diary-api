import { createEntry, deleteEntry, getEntryById, listEntriesByTripId, updateEntry } from "../../services/entryService.js"

export const createEntryController = async (req, res, next) => {
  const tripId = Number(req.params.tripId)
  const data = req.body
  const userId = req.userId

  try {
    const newEntry = await createEntry({...data, tripId}, userId)
    return res.status(201).json(newEntry)
  } catch (error) {
    next(error)
  }
}

export const listEntriesByTripIdController = async (req, res, next) => {
  const { tripId } = req.params
  const userId = req.userId

  try {
    const list = await listEntriesByTripId(Number(tripId), userId)
    return res.json(list)
  } catch (error) {
    next(error)
  }
}

export const getEntryByIdController = async (req, res, next) => {
  const { id } = req.params
  const userId = req.userId

  try {
    const entry = await getEntryById(Number(id), userId)
    return res.json(entry)
  } catch (error) {
    next(error)
  }
}

export const updateEntryController = async (req, res, next) => {
  const data  = req.body
  const { id } = req.params
  const userId = req.userId

  try {
    const updated = await updateEntry(id, data, userId)
    return res.json(updated)
  } catch (error) {
    next(error)
  }
}

export const deleteEntryController = async (req, res, next) => {
  const { id } = req.params
  const userId = req.userId

  try {
    const deleted = await deleteEntry(id, userId)
    return res.json(deleted)
  } catch (error) {
    next(error)
  }
}
