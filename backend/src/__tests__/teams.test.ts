import supertest from 'supertest'
import { describe, expect, test } from 'vitest'
import { app } from '../utils'

const api = supertest(app)

describe('Testing teams router', () => {
  describe('GET', () => {
    test('Get all teams', async () => {
      const response = await api.get('/api/teams')
      expect(response.statusCode).toBe(200)
      expect(response.body.length).toBeGreaterThan(170)
    })
    test('Get teams for map', async () => {
      const response = await api.get('/api/teams/map?women=false')
      expect(response.statusCode).toBe(200)
      expect(response.body.length).toBeGreaterThanOrEqual(16)
      expect(response.body).toContainEqual(
        expect.objectContaining({ county: 'Stockholm' })
      )
      expect(response.body).toHaveProperty([0, 'teams', 0, 'women'], false)
      expect(response.body).not.toHaveProperty([0, 'teams', 0, 'women'], true)
    })
  })
  // describe('POST', () => {})
  // describe('PUT', () => {})
  // describe('DELETE', () => {})
})
