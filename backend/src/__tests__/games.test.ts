import supertest from 'supertest'
import { describe, expect, test } from 'vitest'
import { app } from '../utils'

const api = supertest(app)

// let cookie: string

// beforeAll(async () => {

//   cookie = await loginFunction()
// })

describe('Testing Games router', () => {
  describe('GET', () => {
    test('Get season games', async () => {
      const response = await api.get('/api/games/season/2023')
      expect(response.statusCode).toBe(200)
    })
  })
  // describe('POST', () => {})
  // describe('DELETE', () => {})
  // describe('PUT', () => {})
})
