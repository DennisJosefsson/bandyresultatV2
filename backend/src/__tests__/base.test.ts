import supertest from 'supertest'
import { describe, expect, test } from 'vitest'
import { app } from '../utils'

const api = supertest(app)

describe('Testing default health check', async () => {
  const response = await api.get('/healthcheck')
  console.log(response.headers)

  test('Status code', () => {
    expect(response.statusCode).toBe(200)
  })
  test('Content type', () => {
    expect(response.headers['content-type']).toMatch(
      'application/json; charset=utf-8'
    )
  })
  test('Content', () => {
    expect(response.body.message).toBe('Hello world!')
  })
})

describe('Testing wrong api', async () => {
  const response = await api.get('/api/wrong')

  test('Status code', () => {
    expect(response.statusCode).toBe(404)
    expect(response.body.errors).toBe('Sidan finns inte.')
  })
})
