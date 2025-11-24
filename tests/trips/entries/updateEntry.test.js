import { vi, beforeAll, afterAll, describe, it, expect } from 'vitest';
import { updateEntry, deleteEntry, createEntry, getEntryById, listEntriesByTripId } from '../../../src/services/entryService.js';
import { prisma } from '../../../src/lib/prisma.js'

describe('Entry Service', () => {
  let tripId

  beforeAll(async () => {
    await prisma.entry.deleteMany()
    await prisma.trip.deleteMany()

    const trip = await prisma.trip.create({
      data: {
        title: "test title",
        description: "Test City",
        startDate: new Date(),
        endDate: new Date()
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
    })

    const updated = await updateEntry(newEntry.id, {
      title: "FUNCIONOU!"
    })

    await expect(updated.title).toBe('FUNCIONOU!')
  })
})
