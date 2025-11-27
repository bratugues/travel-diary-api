import { vi, beforeAll, afterAll, describe, it, expect } from 'vitest';
import { createEntry, getEntryById, listEntriesByTripId } from '../../../src/services/entryService.js';
import { prisma } from '../../../src/lib/prisma.js'

describe('Entry Service', () => {
  let tripId
  let fakeUserId

  beforeAll(async () => {
    await prisma.entry.deleteMany()
    await prisma.trip.deleteMany()
    await prisma.user.deleteMany()

    const user = await prisma.user.create({
      data: {
        name: "Test",
        email: "abasdfu@email.com",
        password:"123123"
      }
    })

    fakeUserId = user.id
    const trip = await prisma.trip.create({
      data: {
        title: "test title",
        description: "Test City",
        startDate: new Date(),
        endDate: new Date(),
        userId: fakeUserId
      }
    })
    tripId = trip.id
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should list entries by trip id', async () => {
    const firstEntry = await createEntry({
      tripId: tripId,
      title: "test 1",
      content: "this is just the first test",
      date: new Date()
    }, fakeUserId)
    const secondEntry = await createEntry({
      tripId: tripId,
      title: "test 2",
      content: "this is just the second test",
      date: new Date()
    }, fakeUserId)

    const entriesList = await listEntriesByTripId(tripId, fakeUserId)

    expect(entriesList).toHaveLength(2)
    expect(entriesList[0].tripId).toBe(tripId)
  })

  it('should find a specific entry', async () => {
    const newEntry = await createEntry({
      tripId: tripId,
      title: "test",
      content: "this is just a test",
      date: new Date()
    }, fakeUserId)
    const result = await getEntryById(newEntry.id, fakeUserId)

    expect(result.id).toEqual(newEntry.id)
    expect(result.title).toBe(newEntry.title)
  })

  it('should return an error if id doesnt exist', async () => {
    await expect(getEntryById(238923, fakeUserId)).rejects.toThrow("Entry not found")
  })
})
