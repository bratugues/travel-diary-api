import { vi, beforeEach, describe, it, expect } from 'vitest';
import { createTrip } from '../../src/services/tripService';
import { prisma } from '../../src/lib/prisma.js'

beforeEach(async () => {
  await prisma.trip.deleteMany()
})

describe('create a trip', () => {

  it('should create a trip with valid input', async () => {
    const input = {
    title: 'Viagem para Paris',
    description: 'Primeira viagem de teste',
    startDate: new Date('2025-11-12'),
    endDate: new Date('2025-11-20')
    }
    const trip = await createTrip(input)

    expect(trip.id).toBeDefined()
    expect(trip.title).toBe('Viagem para Paris')

    const inDb = await prisma.trip.findUnique({where: {id: trip.id}})
    expect(inDb).not.toBeNull()
})


})
