import { prisma } from '../lib/prisma.js'
import { createTripSchema, updateTripSchema } from '../modules/trip.schema.js'

export const createTrip = async (input) => {
  const validateInput = createTripSchema.safeParse(input)

  if (validateInput.success) {
    const { title, description, startDate, endDate } = validateInput.data
    const trip = await prisma.trip.create({
      data:{
        title,
        description,
        startDate,
        endDate
      }
    })
    return trip
  } else {
    throw new Error(validateInput.error?.message || 'Invalid trip input')
  }
}


export const listTrips = async () => {
  const trips = await prisma.trip.findMany({orderBy: {createdAt: 'desc'}})
  return trips
}
