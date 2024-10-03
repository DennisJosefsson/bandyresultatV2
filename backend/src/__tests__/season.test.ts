import supertest from 'supertest'
import { beforeAll, describe, expect, test } from 'vitest'
import { app } from '../utils'
import { loginFunction } from './testFunctions/loginFunction'
import { editSeries } from './testObjects/editSeries'
import {
  editTeamSeason,
  newTeamSeason,
  newTeamSeasonErrorData,
} from './testObjects/newTeamSeason'

const api = supertest(app)

let cookie: string

beforeAll(async () => {
  cookie = await loginFunction()
})

describe('Testing Season router', () => {
  describe('GET', () => {
    test('All seasons', async () => {
      const response = await api.get('/api/seasons')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveLength(172)
      expect(response.body).toContainEqual(
        expect.objectContaining({ year: '2024/2025', women: false })
      )
      expect(response.body).toContainEqual(
        expect.objectContaining({ year: '2024/2025', women: true })
      )
    })
    test('All seasons, paginated', async () => {
      const response = await api.get('/api/seasons/paginated?page=1')
      expect(response.statusCode).toBe(200)
      expect(response.body.count).toBe(119)
      expect(response.body.rows).toContainEqual(
        expect.objectContaining({ year: '2024/2025', women: false })
      )
      expect(response.body).not.toContainEqual(
        expect.objectContaining({ year: '2024/2025', women: true })
      )
      const responsePage7 = await api.get('/api/seasons/paginated?page=7')
      expect(responsePage7.statusCode).toBe(200)
      expect(responsePage7.body.count).toBe(119)
      expect(responsePage7.body.rows).toContainEqual(
        expect.objectContaining({ seasonId: 47, year: '1953' })
      )
      expect(responsePage7.body).not.toContainEqual(
        expect.objectContaining({ seasonId: 48, year: '1954' })
      )
    })
    test('Single season', async () => {
      const response = await api.get('/api/seasons/1980')
      expect(response.body).toHaveLength(2)
      expect(response.body).toContainEqual(
        expect.objectContaining({ year: '1979/1980', women: false })
      )
      expect(response.body).toContainEqual(
        expect.objectContaining({ year: '1979/1980', women: true })
      )
      expect(response.body[0].teams).toHaveLength(20)
      expect(response.body[0].teams).toContainEqual(
        expect.objectContaining({
          teamId: 103,
          name: 'Surte BK',
          city: 'Surte',
        })
      )
      expect(response.body[0].series).toHaveLength(9)
      expect(response.body[0].series).toContainEqual(
        expect.objectContaining({
          serieId: 117,
          serieGroupCode: 'Div1Norr',
          serieCategory: 'regular',
          serieName: 'Division 1 Norra',
          serieStructure: [4, 8, 9],
        })
      )
      expect(response.body[0].metadata).toBeDefined()
      expect(response.body[0].metadata).toMatchObject({
        metadataId: 77,
        seasonId: 74,
        name: 'Division 1',
        year: '1979/1980',
        winnerId: 108,
        winnerName: 'IF Boltic',
        hostCity: 'Stockholm',
        finalDate: '1980-03-16',
      })
    })
    test('Single season, 404', async () => {
      const response = await api.get('/api/seasons/2026')
      expect(response.statusCode).toBe(404)
      expect(response.body).toEqual({ errors: 'No such season' })
    })
  })
  describe('POST', () => {
    test('Post new season, wrong data', async () => {
      const response = await api
        .post('/api/seasons')
        .set('Cookie', cookie)
        .send({ yearString: '2999' })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        errors: 'Fel format, ny säsong, Invalid input',
      })
    })
    test('Post new season, wrong data type', async () => {
      const response = await api
        .post('/api/seasons')
        .set('Cookie', cookie)
        .send({ yearString: 2999 })
      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        errors: 'Expected string, received number',
      })
    })
    test('Post new season, wrong yearString format', async () => {
      const response = await api
        .post('/api/seasons')
        .set('Cookie', cookie)
        .send({ yearString: '2025/2027' })
      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        errors: 'Invalid input',
      })
    })
    test('Post new season, return 201', async () => {
      const response = await api
        .post('/api/seasons')
        .set('Cookie', cookie)
        .send({ yearString: '2025/2026' })

      expect(response.statusCode).toBe(201)
      expect(response.body.menSeason).toBeDefined()
      expect(response.body.menSeason).toMatchObject({
        women: false,
        year: '2025/2026',
      })
      expect(response.body.womenSeason).toBeDefined()
      expect(response.body.womenSeason).toMatchObject({
        women: true,
        year: '2025/2026',
      })

      expect(response.body.newSeries).toContainEqual(
        expect.objectContaining({
          seasonId: response.body.menSeason.seasonId as number,
          serieCategory: 'final',
          serieGroupCode: 'final',
        })
      )
      expect(response.body.newSeries).toContainEqual(
        expect.objectContaining({
          seasonId: response.body.menSeason.seasonId as number,
          serieCategory: 'regular',
          serieGroupCode: 'elitserien',
          serieName: 'Elitserien',
        })
      )

      expect(response.body.newSeries).toContainEqual(
        expect.objectContaining({
          seasonId: response.body.womenSeason.seasonId as number,
          serieCategory: 'final',
          serieGroupCode: 'final',
        })
      )
      expect(response.body.newSeries).toContainEqual(
        expect.objectContaining({
          seasonId: response.body.womenSeason.seasonId as number,
          serieCategory: 'regular',
          serieGroupCode: 'elitserien',
          serieName: 'Elitserien',
        })
      )
      expect(response.body.newMetadata).toContainEqual(
        expect.objectContaining({
          seasonId: response.body.womenSeason.seasonId as number,
        })
      )
      expect(response.body.newMetadata).toContainEqual(
        expect.objectContaining({
          seasonId: response.body.menSeason.seasonId as number,
        })
      )
      expect(response.body.newMensTeamSeason).toContainEqual(
        expect.objectContaining({ teamId: 6, women: false })
      )
      expect(response.body.newWomensTeamSeason).toContainEqual(
        expect.objectContaining({ teamId: 26, women: true })
      )
    })
    test('Post already existing season, return 400', async () => {
      const response = await api
        .post('/api/seasons')
        .set('Cookie', cookie)
        .send({ yearString: '2025/2026' })

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({ errors: 'Säsong finns redan.' })
    })
    test('Add teamseason', async () => {
      const response = await api
        .post('/api/teamSeasons')
        .set('Cookie', cookie)
        .send(newTeamSeason)
      expect(response.statusCode).toBe(201)
      expect(response.body).toMatchObject(newTeamSeason)
    })
    test('Add teamseason', async () => {
      const response = await api
        .post('/api/teamSeasons')
        .set('Cookie', cookie)
        .send(newTeamSeasonErrorData)
      expect(response.statusCode).toBe(400)
    })
  })
  describe('PUT', () => {
    test('Edit teamseasons', async () => {
      const response = await api
        .post('/api/teamSeasons')
        .set('Cookie', cookie)
        .send(editTeamSeason)
      expect(response.statusCode).toBe(201)
      expect(response.body).toContainEqual(1)
    })
    test('Edit serie', async () => {
      const initResponse = await api.get('/api/series/1598')
      expect(initResponse.body.serieStructure).toBeFalsy()
      const editResponse = await api
        .post('/api/series')
        .set('Cookie', cookie)
        .send(editSeries)
      expect(editResponse.statusCode).toBe(201)

      expect(editResponse.body[0].serieStructure).toEqual(
        editSeries.serieStructure
      )
    })
  })
  describe('DELETE', () => {
    test('Delete teamseason', async () => {
      const response = await api
        .delete('/api/teamSeasons/2485')
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(204)
    })
    test('Already deleted teamseason, return 404', async () => {
      const response = await api
        .delete('/api/teamSeasons/2485')
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(404)
    })
    test('Delete teamseason, without cookie, return 401', async () => {
      const response = await api.delete('/api/teamSeasons/2485')

      expect(response.statusCode).toBe(401)
    })
  })
})
