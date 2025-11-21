import { vi, beforeEach, describe, it, expect } from 'vitest';
import { createTrip, getTripById } from '../../src/services/tripService';
import { prisma } from '../../src/lib/prisma.js'

beforeEach(async () => {
  await prisma.trip.deleteMany()
})

describe('get trip by id', () => {
  it('should be able to find a trip by id', async () => {
    const input = {
    title: 'Viagem para Paris',
    description: 'Primeira viagem de teste',
    startDate: new Date('2025-11-12'),
    endDate: new Date('2025-11-20')
    }
    const trip = await createTrip(input)

    const result = await getTripById(trip.id)

    expect(result.id).toBe(trip.id)
    expect(result.title).toBe(trip.title)
  })

  it('should throw an error when id is invalid (not a number)', async () => {
    const result = getTripById('abc')

    await expect(result).rejects.toThrow('Invalid Trip ID')
  })

  it('should throw an error when no trip is found', async () => {
    const result = getTripById(9999)
    await expect(result).rejects.toThrow("Trip not found")
  })
})
