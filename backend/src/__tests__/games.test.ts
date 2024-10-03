import supertest from 'supertest'
import { beforeAll, describe, expect, test } from 'vitest'
import { app } from '../utils'
import { loginFunction } from './testFunctions/loginFunction'
import { editGame, newGame, newGameErrorData } from './testObjects/newGame'

const api = supertest(app)

let cookie: string
let newGameGameId: number

beforeAll(async () => {
  cookie = await loginFunction()
})

async function getSingleSeason() {
  const response = await api.get('/api/games/season/2023?women=false')
  return response
}

describe('Testing Games router', () => {
  describe('GET', () => {
    describe('GET season games', () => {
      test('Season games return status 200', async () => {
        const response = await getSingleSeason()

        expect(response.statusCode).toBe(200)
      })
      test('Property unplayedLength to be defined and have length 0', async () => {
        const response = await getSingleSeason()
        expect(response.body.unplayedLength).toBeDefined()
        expect(response.body.unplayedLength).toBe(0)
      })
      test('Season object to be defined and have specific property', async () => {
        const response = await getSingleSeason()
        expect(response.body.season).toBeDefined()
        expect(response.body.season).toHaveLength(1)
        expect(response.body.season).toContainEqual(
          expect.objectContaining({ seasonId: 117 })
        )
      })
      test('Series array to be defined and contain serie with specific property', async () => {
        const response = await getSingleSeason()
        expect(response.body.series).toBeDefined()
        expect(response.body.series).toHaveLength(11)
        expect(response.body.series).toContainEqual(
          expect.objectContaining({ serieId: 283, serieGroupCode: 'KvalA' })
        )
      })
      test('Played object with specific properties', async () => {
        const response = await getSingleSeason()
        expect(response.body.played.FinalGames).toBeDefined()
        expect(response.body.played.FinalGames).toHaveLength(1)
        expect(response.body.played.FinalGames).toContainEqual(
          expect.objectContaining({ group: 'final', name: 'Final' })
        )
        expect(response.body.played.SemiGames).toContainEqual(
          expect.objectContaining({ group: 'S1' })
        )
        expect(response.body.played.QuarterGames).toContainEqual(
          expect.objectContaining({ group: 'Q1' })
        )
        expect(response.body.played.RegularGames).toContainEqual(
          expect.objectContaining({ group: 'elitserien', name: 'Elitserien' })
        )
      })
    })
  })
  describe('POST', () => {
    describe('POST games', () => {
      test('New game, correct data return 201', async () => {
        const response = await api
          .post('/api/games')
          .set('Cookie', cookie)
          .send(newGame)
        expect(response.statusCode).toBe(201)
        expect(response.body.game.gameId).toBeDefined()
        expect(response.body.game.date).toEqual(newGame.date)
        expect(response.body.homeTeamGame.teamId).toBe(newGame.homeTeamId)
        expect(response.body.awayTeamGame.teamId).toBe(newGame.awayTeamId)
        newGameGameId = response.body.game.gameId as number
        const gameResponse = await api.get(`/api/games/${newGameGameId}`)
        expect(gameResponse.statusCode).toBe(200)
        expect(gameResponse.body.homeTeamId).toBe(newGame.homeTeamId)
        expect(gameResponse.body.result).toBeFalsy()
        expect(gameResponse.body.played).toBe(false)
      })
      test('Post wrong data, return 400', async () => {
        const response = await api
          .post('/api/games')
          .set('Cookie', cookie)
          .send(newGameErrorData)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ errors: 'Required', paths: [['date']] })
      })
      test('Post new game without cookie, return 401', async () => {
        const response = await api.post('/api/games').send(newGame)
        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({ errors: 'No cookie' })
      })
    })
  })
  describe('PUT', () => {
    test('Edit game', async () => {
      const response = await api
        .post('/api/games')
        .set('Cookie', cookie)
        .send({ ...editGame, gameId: newGameGameId })
      expect(response.statusCode).toBe(201)
      expect(response.body.game.result).toBe(editGame.result)
      expect(response.body.game.halftimeResult).toBe(editGame.halftimeResult)
      expect(response.body.game.played).toBe(true)
    })
  })
  describe('DELETE', () => {
    test('Delete game', async () => {
      const response = await api
        .delete(`/api/games/${newGameGameId}`)
        .set('Cookie', cookie)
      expect(response.body.message).toBe('Game deleted')
      const gameResponse = await api.get(`/api/games/${newGameGameId}`)
      expect(gameResponse.statusCode).toBe(404)
      expect(gameResponse.body).toEqual({ errors: 'No such game' })
    })
    test('Delete game again, expect 404', async () => {
      const response = await api
        .delete(`/api/games/${newGameGameId}`)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(404)
    })
    test('Delete game without cookie, expect 401', async () => {
      const response = await api.delete(`/api/games/${newGameGameId}`)
      expect(response.statusCode).toBe(401)
      expect(response.body).toEqual({ errors: 'No cookie' })
    })
  })
})
