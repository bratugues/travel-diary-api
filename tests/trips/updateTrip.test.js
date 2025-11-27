import { vi, beforeEach, describe, it, expect } from 'vitest';
import { createTrip, getTripById, updateTrip } from '../../src/services/tripService';
import { prisma } from '../../src/lib/prisma.js'

describe('update a trip', () => {
  let fakeUserId
  beforeEach(async () => {
    await prisma.entry.deleteMany()
    await prisma.trip.deleteMany()
    await prisma.user.deleteMany()
    const user = await prisma.user.create({
    data: {
      name: "Fake User",
      email: "fakeuser@test.com",
      password: "123123"
    }
  })

  fakeUserId = user.id
  })

  it('should be able to update a trip', async () => {
    const input = {
    title: 'Viagem para Paris',
    description: 'Primeira viagem de teste',
    startDate: new Date('2025-11-12'),
    endDate: new Date('2025-11-20'),
    userId: fakeUserId
    }
    const trip = await createTrip(fakeUserId, input)

    const newTrip = {
    title: 'Viagem para Shanghai',
    description: 'Teste de update',
    startDate: new Date('2026-01-21'),
    endDate: new Date('2026-02-04')
    }
    const updatedTrip = await updateTrip(trip.id, newTrip, fakeUserId)

    expect(updatedTrip.title).toBe('Viagem para Shanghai')
    const inDb = await prisma.trip.findUnique({where: {id: updatedTrip.id}})
    expect(inDb.title).toBe('Viagem para Shanghai')
  })

  it('should not be able to update a trip that does not exist or belongs to another user', async () => {
    const updatePromise = updateTrip(9999, { title: "Hacker" }, fakeUserId)

    await expect(updatePromise).rejects.toThrow("Trip not found")
  })
})
