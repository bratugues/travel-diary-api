import { createEntry, deleteEntry, getEntryById, listEntriesByTripId, updateEntry } from "../../services/entryService.js"

export const createEntryController = async (req, res, next) => {
  const tripId = Number(req.params.tripId)
  const data = req.body

  try {
    const newEntry = await createEntry(...data, tripId)
    return res.status(201).json(newEntry)
  } catch (error) {
    next(error)
  }
}

export const listEntriesByTripIdController = async (req, res, next) => {
  const { tripId } = req.params

  try {
    const list = await listEntriesByTripId(Number(tripId))
    return res.json(list)
  } catch (error) {
    next(error)
  }
}

export const getEntryByIdController = async (req, res, next) => {
  const { id } = req.params

  try {
    const entry = await getEntryById(Number(id))
    return res.json(entry)
  } catch (error) {
    next(error)
  }
}

export const updateEntryController = async (req, res, next) => {
  const { id, data } = req.body

  try {
    const updated = await updateEntry(id, data)
    return res.json(updated)
  } catch (error) {
    next(error)
  }
}

export const deleteEntryController = async (req, res, next) => {
  const { id } = req.body

  try {
    const deleted = await deleteEntry(id)
    return res.json(deleted)
  } catch (error) {
    next(error)
  }
}
