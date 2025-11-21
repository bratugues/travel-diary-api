import { vi, beforeEach, describe, it, expect } from 'vitest';
import { createTrip, getTripById, updateTrip } from '../../src/services/tripService';
import { prisma } from '../../src/lib/prisma.js'

beforeEach(async () => {
  await prisma.trip.deleteMany()
})

describe('update a trip', () => {

  it('should be able to update a trip', async () => {
    const input = {
    title: 'Viagem para Paris',
    description: 'Primeira viagem de teste',
    startDate: new Date('2025-11-12'),
    endDate: new Date('2025-11-20')
    }
    const trip = await createTrip(input)

    const newTrip = {
    title: 'Viagem para Shanghai',
    description: 'Teste de update',
    startDate: new Date('2026-01-21'),
    endDate: new Date('2026-02-04')
    }
    const updatedTrip = await updateTrip(trip.id, newTrip)

    expect(updatedTrip.title).toBe('Viagem para Shanghai')
    const inDb = await prisma.trip.findUnique({where: {id: updatedTrip.id}})
    expect(inDb.title).toBe('Viagem para Shanghai')
  })
})
