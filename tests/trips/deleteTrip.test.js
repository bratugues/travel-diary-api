import { vi, beforeEach, describe, it, expect } from 'vitest';
import { createTrip, deleteTrip, getTripById, updateTrip } from '../../src/services/tripService';
import { prisma } from '../../src/lib/prisma.js'

beforeEach(async () => {
  await prisma.trip.deleteMany()
})

describe('delete a trip', () => {

  it('should be able to delete a trip when id exists', async () => {
    const created = await prisma.trip.create({
    data: {
    title: 'Viagem para testar delete',
    description: 'Teste',
    startDate: new Date('2025-10-10'),
    endDate: new Date('2025-10-20')
  }

})
    const deleted = await deleteTrip(created.id)

    expect(deleted.id).toBe(created.id)
    expect(deleted.title).toBe('Viagem para testar delete')

    const inDb = await prisma.trip.findUnique({where: {id: created.id}})
    expect(inDb).toBeNull()
  })

  it('should throw an error when id is invalid (not a number)', async () => {
    await expect(deleteTrip('abc')).rejects.toThrow('Trip ID must be a number')
  })
})
