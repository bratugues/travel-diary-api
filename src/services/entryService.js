import { prisma } from '../lib/prisma.js'
import { createEntrySchema, updateEntrySchema } from '../modules/entry/entry.schema.js'

export const createEntry = async (input, userId) => {
  const result = createEntrySchema.safeParse(input)

  if (!result.success) {
    throw result.error
  }

  const { title, content, date, tripId } = result.data
  const trip = await prisma.trip.findFirst({where: {id: tripId, userId: userId}})

  if (!trip) {
    throw new Error("Trip not found")
  }

  const newEntry = await prisma.entry.create({
    data: {tripId: Number(tripId), content, date, title}
  })

  return newEntry
}

export const getEntryById = async (id, userId) => {
  if(isNaN(id)) throw new Error("Invalid Entry ID")
  const entry = await prisma.entry.findFirst({where:{id: Number(id), trip: {userId: userId}}})

  if (!entry) {
    throw new Error("Entry not found")
  }

  return entry
}

export const listEntriesByTripId = async (tripId, userId) => {
  if(isNaN(tripId)) throw new Error("Trip Id is not valid")

  const trip = await prisma.trip.findFirst({where: {id: tripId, userId: userId}})
  if(!trip){
    throw new Error("Trip not found")
  }
  const entryList = await prisma.entry.findMany({where: {tripId}, orderBy: {date: 'desc'}})
  return entryList

}

export const updateEntry = async (id, data, userId) => {
  const entry = await getEntryById(id, userId)

  const updated = await prisma.entry.update({
    where: {id: entry.id,}, data: data
  })

  return updated
}

export const deleteEntry = async (id, userId) => {
  const entry = await getEntryById(id, userId)

  const deleted = await prisma.entry.delete({where: {id: entry.id}})

  return deleted
}
