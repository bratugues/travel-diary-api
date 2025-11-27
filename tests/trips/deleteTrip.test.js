import { vi, beforeEach, describe, it, expect } from 'vitest';
import { createTrip, deleteTrip, getTripById, updateTrip } from '../../src/services/tripService';
import { prisma } from '../../src/lib/prisma.js'


describe('delete a trip', () => {
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
  it('should be able to delete a trip when id exists', async () => {
    const created = await prisma.trip.create({
    data: {
    title: 'Viagem para testar delete',
    description: 'Teste',
    startDate: new Date('2025-10-10'),
    endDate: new Date('2025-10-20'),
    userId: fakeUserId
  }

})
    const deleted = await deleteTrip(created.id, fakeUserId)

    expect(deleted.id).toBe(created.id)
    expect(deleted.title).toBe('Viagem para testar delete')

    const inDb = await prisma.trip.findUnique({where: {id: created.id}})
    expect(inDb).toBeNull()
  })

  it('should throw an error when id is invalid (not a number)', async () => {
    await expect(deleteTrip('abc', fakeUserId)).rejects.toThrow('Trip ID must be a number')
  })
})
