import { vi, beforeAll, afterAll, describe, it, expect } from 'vitest';
import { updateEntry, deleteEntry, createEntry, getEntryById, listEntriesByTripId } from '../../../src/services/entryService.js';
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

  it('should update an entry', async () => {
    const newEntry = await createEntry({
      tripId: tripId,
      title: "test 1",
      content: "this is just the first test",
      date: new Date()
    }, fakeUserId)

    const updated = await updateEntry(newEntry.id, {
      title: "FUNCIONOU!"
    }, fakeUserId)

    await expect(updated.title).toBe('FUNCIONOU!')
  })
})
