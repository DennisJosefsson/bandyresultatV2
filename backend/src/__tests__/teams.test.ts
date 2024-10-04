import supertest from 'supertest'
import { beforeAll, describe, expect, test } from 'vitest'
import { app } from '../utils'
import { loginFunction } from './testFunctions/loginFunction'
import { editTeam, newTeam, newTeamErrorData } from './testObjects/newTeam'

const api = supertest(app)

let newTeamId: number

let cookie: string

beforeAll(async () => {
  cookie = await loginFunction()
})

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
    test('Get single team', async () => {
      const response = await api.get('/api/teams/12')
      expect(response.statusCode).toBe(200)
      expect(response.body.team).toMatchObject({
        teamId: 12,
        name: 'Vetlanda BK',
        city: 'Vetlanda',
        casualName: 'Vetlanda',
        shortName: 'VBK',
      })
      expect(response.body.team).toHaveProperty('seasonteam')
      expect(response.body.noWinStreak).toBeDefined()
      expect(response.body.unbeatenStreak).toBeDefined()
      expect(response.body.winStreak).toBeDefined()
      expect(response.body.drawStreak).toBeDefined()
      expect(response.body.losingStreak).toBeDefined()
      expect(response.body.finalsAndWins).toBeDefined()
      expect(response.body.playoffStreak).toBeDefined()
      expect(response.body.playoffCount).toBeDefined()
      expect(response.body.sortedFiveSeasons).toBeDefined()
      expect(response.body.chartData).toBeDefined()
    })
    test('Get dummy team, return 404', async () => {
      const response = await api.get('/api/teams/176')
      expect(response.statusCode).toBe(404)
      expect(response.body).toEqual({ errors: 'Inget sådant lag finns.' })
    })
    test('Get non-existing team, return 404', async () => {
      const response = await api.get('/api/teams/999')
      expect(response.statusCode).toBe(404)
      expect(response.body).toEqual({ errors: 'Inget sådant lag finns.' })
    })
  })

  describe('POST', () => {
    test('Post team', async () => {
      const response = await api
        .post('/api/teams')
        .set('Cookie', cookie)
        .send(newTeam)
      expect(response.statusCode).toBe(201)
      expect(response.body).toMatchObject(newTeam)
      newTeamId = response.body.teamId as number
    })
    test('Post team, error data, return 400', async () => {
      const response = await api
        .post('/api/teams')
        .set('Cookie', cookie)
        .send(newTeamErrorData)
      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({ errors: 'Required' })
    })
    test('Post team, missing cookie, return 401', async () => {
      const response = await api.post('/api/teams').send(newTeam)
      expect(response.statusCode).toBe(401)
    })
  })
  describe('PUT', () => {
    test('Edit team data', async () => {
      const response = await api
        .post('/api/teams')
        .set('Cookie', cookie)
        .send({ ...editTeam, teamId: newTeamId })
      expect(response.statusCode).toBe(201)
      expect(response.body).toMatchObject(editTeam)
      expect(response.body).not.toMatchObject(newTeam)
    })
  })
  describe('DELETE', () => {
    test('Delete team, return 200', async () => {
      const response = await api
        .delete(`/api/teams/${newTeamId}`)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(200)
    })
    test('Delete missing team, return 404', async () => {
      const response = await api
        .delete(`/api/teams/${newTeamId}`)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(404)
    })
    test('Delete team, missing cookie, return 401', async () => {
      const response = await api.delete(`/api/teams/${newTeamId}`)
      expect(response.statusCode).toBe(401)
    })
  })
})
