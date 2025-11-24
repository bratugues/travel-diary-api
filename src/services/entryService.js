import { prisma } from '../lib/prisma.js'
import { createEntrySchema, updateEntrySchema } from '../modules/entry/entry.schema.js'

export const createEntry = async (input) => {
  const result = createEntrySchema.safeParse(input)

  if (!result.success) {
    throw result.error
  }

  const { title, content, date } = result.data
  const trip = await prisma.trip.findUnique({where: {id: Number(tripId)}})

  if (!trip) {
    throw new Error("Trip not found")
  }

  const newEntry = await prisma.entry.create({
    data: {tripId: Number(tripId), content, date, title}
  })

  return newEntry
}

export const getEntryById = async (id) => {
  if(isNaN(id)) throw new Error("Invalid Entry ID")
  const entry = await prisma.entry.findUnique({where:{id: Number(id)}})

  if (!entry) {
    throw new Error("Entry not found")
  }

  return entry
}

export const listEntriesByTripId = async (tripId) => {
  if(isNaN(tripId)) throw new Error("Trip Id is not valid")

  const trip = await prisma.trip.findUnique({where: {id: tripId}})
  if(!trip){
    throw new Error("Trip not found")
  }
  const entryList = await prisma.entry.findMany({where: {tripId}, orderBy: {date: 'desc'}})
  return entryList

}

export const updateEntry = async (id, data) => {
  const entry = await getEntryById(id)

  const updated = await prisma.entry.update({
    where: {id: entry.id}, data: data
  })

  return updated
}

export const deleteEntry = async (id) => {
  const entry = await getEntryById(id)

  const deleted = await prisma.entry.delete({where: {id: entry.id}})

  return deleted
}
