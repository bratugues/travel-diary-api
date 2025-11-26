import { prisma } from '../lib/prisma.js'
import { createTripSchema, updateTripSchema } from '../modules/trip/trip.schema.js'

export const createTrip = async (userId, input) => {
  const validateInput = createTripSchema.safeParse(input)

  if(!validateInput.success){
    throw validateInput.error
  }

  const { title, description, startDate, endDate } = validateInput.data
  const trip = await prisma.trip.create({
    data:{
      title,
      description,
      startDate,
      endDate,
      userId: userId
    }
  })
  return trip
}

export const listTrips = async (userId) => {
  const trips = await prisma.trip.findMany({where: { userId: userId }, orderBy: {createdAt: 'desc'}})
  return trips
}

export const getTripById = async (id, userId) => {
  const tripId = Number(id)
  if(isNaN(tripId)) throw new Error('Invalid Trip ID')

  const trip = await prisma.trip.findFirst({where:{id: tripId, userId: userId}})

  if (!trip) throw new Error("Trip not found")

  return trip
}

export const updateTrip = async (id, input, userId) => {
  const tripId = Number(id)
  if(isNaN(tripId)) throw new Error('Invalid Trip Id')

  await getTripById(tripId, userId)

  const validateInput = updateTripSchema.safeParse(input)

  if(!validateInput.success){
    throw validateInput.error
  }
    const updatedTrip = await prisma.trip.update({where: {id: tripId}, data: validateInput.data})
    return updatedTrip
}

export const deleteTrip = async (id, userId) => {
  const tripId = Number(id)
  if(isNaN(tripId)) throw new Error('Trip ID must be a number')

  await getTripById(tripId, userId)

  const deleteTrip = await prisma.trip.delete({where: { id: tripId }})

  return deleteTrip
}
