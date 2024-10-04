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
import {
  correctDevGameDataNormalYear,
  correctDevGameDataNormalYear2,
  correctMapData,
  correctPointsBonusPoints,
  correctStatsData,
  correctTableNormalYear1,
  correctTableNormalYear2,
  correctTableObjectBonusPointsAll,
  correctTableObjectBonusPointsHome,
  correctTableObjectVilla,
  q2FirstGameData,
  semiPlayoffResult,
  statsProperties,
} from './testObjects/seasonData'

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
      expect(response.statusCode).toBe(200)
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
  describe('Frontend Season Data', () => {
    describe('GET season games', () => {
      test('Season games return status 200', async () => {
        const response = await getSingleSeasonGames()

        expect(response.statusCode).toBe(200)
      })
      test('Property unplayedLength to be defined and have length 0', async () => {
        const response = await getSingleSeasonGames()
        expect(response.body.unplayedLength).toBeDefined()
        expect(response.body.unplayedLength).toBe(0)
      })
      test('Season object to be defined and have specific property', async () => {
        const response = await getSingleSeasonGames()
        expect(response.body.season).toBeDefined()
        expect(response.body.season).toHaveLength(1)
        expect(response.body.season).toContainEqual(
          expect.objectContaining({ seasonId: 117 })
        )
      })
      test('Series array to be defined and contain serie with specific property', async () => {
        const response = await getSingleSeasonGames()
        expect(response.body.series).toBeDefined()
        expect(response.body.series).toHaveLength(11)
        expect(response.body.series).toContainEqual(
          expect.objectContaining({ serieId: 283, serieGroupCode: 'KvalA' })
        )
      })
      test('Played object with specific properties', async () => {
        const response = await getSingleSeasonGames()
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
    describe('GET season tables', () => {
      test('Get tables, return 200', async () => {
        const response = await getSingleSeasonTables()
        expect(response.statusCode).toBe(200)
        expect(response.body.tables).toHaveLength(2)
      })
      test('Get tables, response object returns specific properties', async () => {
        const response = await getSingleSeasonTables()
        expect(response.body).toHaveProperty('tables[0].group')
        expect(response.body).toHaveProperty('tables[0].name')
        expect(response.body).toHaveProperty('tables[0].comment')
        expect(response.body).toHaveProperty('tables[0].serieStructure')
        expect(response.body).toHaveProperty('tables[0].tables')
      })
      test('Tables, correctly calculated', async () => {
        const response = await getSingleSeasonTables()
        expect(response.body.tables).toHaveProperty(
          [0, 'tables'],
          expect.arrayContaining([
            expect.objectContaining(correctTableObjectVilla),
          ])
        )
      })
      test('Tables, correctly calculated with bonuspoints, all games', async () => {
        const response = await getSingleSeasonTablesWithBonusPointsAll()
        expect(response.body.tables).toHaveProperty(
          [1, 'tables'],
          expect.arrayContaining([
            expect.objectContaining(correctTableObjectBonusPointsAll),
          ])
        )
      })
      test('Tables, correctly calculated with bonuspoints, home games', async () => {
        const response = await getSingleSeasonTablesWithBonusPointsHome()
        expect(response.body.tables).toHaveProperty(
          [1, 'tables'],
          expect.arrayContaining([
            expect.objectContaining(correctTableObjectBonusPointsHome),
          ])
        )
      })
      test('Tables, mix group not existing', async () => {
        const response = await getSingleSeasonTablesMixGroups()
        expect(response.body.tables).not.toContainEqual(
          expect.objectContaining({ group: 'mix' })
        )
        expect(response.body.tables).toContainEqual(
          expect.objectContaining({ group: 'AllsvNorr' })
        )
        expect(response.body.tables).toContainEqual(
          expect.objectContaining({ group: 'AllsvSyd' })
        )
      })
    })
    describe('GET season playoff', () => {
      test('Correct properties', async () => {
        const response = await getSingleSeasonPlayoff()
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('final')
        expect(response.body).toHaveProperty('results.semiResults')
        expect(response.body).toHaveProperty('results.quarterResults')
        expect(response.body).toHaveProperty('results.eightResults')
      })
      test('Correct playoff data', async () => {
        const response = await getSingleSeasonPlayoff()
        expect(response.body.results).toHaveProperty(
          ['semiResults', 0, 'result'],
          semiPlayoffResult
        )
        expect(response.body.results).toHaveProperty(
          ['quarterResults', 2, 'group'],
          'Q3'
        )
        expect(response.body.results).toHaveProperty(
          ['quarterResults', 1, 'games', 0],
          q2FirstGameData
        )
      })
    })
    describe('Get season map', () => {
      test('Get map teams', async () => {
        const response = await api.get('/api/seasons/2023')
        expect(response.body[0]).toHaveProperty('teams')
        expect(response.body[0].teams.length).toBeGreaterThan(10)
        expect(response.body).toContainEqual(
          expect.objectContaining({ year: '2022/2023', women: false })
        )
        expect(response.body).toContainEqual(
          expect.objectContaining({ year: '2022/2023', women: true })
        )
        expect(response.body).toHaveProperty(
          [0, 'teams'],
          expect.arrayContaining([expect.objectContaining(correctMapData)])
        )
      })
    })
    describe('Get season stats', () => {
      test('Correct stats properties', async () => {
        const response = await api.get('/api/games/stats/2023?women=false')
        statsProperties.forEach((property) => {
          expect(response.body).toHaveProperty(property)
        })
      })
      test('Correct stats data', async () => {
        const response = await api.get('/api/games/stats/2023?women=false')
        expect(response.body.gamesCountTotalCat).toContainEqual(
          expect.objectContaining(correctStatsData.final)
        )
        expect(response.body.gamesCountTotalCat).toContainEqual(
          expect.objectContaining(correctStatsData.quarter)
        )
        expect(response.body.winCountHomeTeam).toBe(109)
        expect(response.body.winCountAwayTeam).toBe(64)
        expect(response.body.drawCount).toBe(22)
      })
    })
    describe('Get season development data', () => {
      test('Correct properties', async () => {
        const response = await api.get('/api/games/animation/2023?women=false')
        expect(response.body).toHaveProperty('games')
        expect(response.body).toHaveProperty('length')
        expect(response.body).toHaveProperty('series')
      })
      test('Correct data, normal season', async () => {
        const response = await api.get('/api/games/animation/2023?women=false')
        expect(response.body.games).toContainEqual(
          expect.objectContaining({
            group: 'elitserien',
            serieName: 'Elitserien',
          })
        )
        expect(response.body.games).toHaveProperty(
          [0, 'dates', 0, 'date'],
          '2022-10-28'
        )
        expect(response.body.games).toHaveProperty(
          [0, 'dates', 0, 'games'],
          expect.arrayContaining([
            expect.objectContaining(correctDevGameDataNormalYear),
            expect.objectContaining(correctDevGameDataNormalYear2),
          ])
        )
        expect(response.body.games).toHaveProperty(
          [0, 'dates', 0, 'table'],
          expect.arrayContaining([
            expect.objectContaining(correctTableNormalYear1),
            expect.objectContaining(correctTableNormalYear2),
          ])
        )
        expect(response.body.series).toHaveProperty([0, 'serieName'])
        expect(response.body.series).toHaveProperty([0, 'serieGroupCode'])
        expect(response.body.series).toHaveProperty([0, 'serieCategory'])
        expect(response.body.series[0].serieName).toBe('Elitserien')
      })
      test('Correct data length, multi-series season', async () => {
        const response = await api.get('/api/games/animation/2002?women=false')
        expect(response.body.games).toHaveLength(4)
      })
      test('Correct points, bonuspoints table', async () => {
        const response = await api.get('/api/games/animation/2002?women=false')
        expect(response.body.games).toHaveProperty(
          [2, 'dates', 0, 'table'],
          expect.arrayContaining([
            expect.objectContaining(correctPointsBonusPoints),
          ])
        )
      })
      test('Correct game array, mixed game season', async () => {
        const response = await api.get('/api/games/animation/1984?women=false')
        expect(response.body.games).toHaveProperty(
          [0, 'dates', 1, 'games'],
          expect.arrayContaining([
            expect.objectContaining({ gameId: 6621, mix: true }),
          ])
        )
        expect(response.body.games).toHaveProperty(
          [1, 'dates', 1, 'games'],
          expect.arrayContaining([
            expect.objectContaining({ gameId: 6621, mix: true }),
          ])
        )
      })
    })
  })
})

async function getSingleSeasonGames() {
  const response = await api.get('/api/games/season/2023?women=false')
  return response
}

async function getSingleSeasonTables() {
  const response = await api.get(
    '/api/tables/league/2024?table=all&women=false'
  )
  return response
}

async function getSingleSeasonTablesWithBonusPointsAll() {
  const response = await api.get(
    '/api/tables/league/2001?table=all&women=false'
  )
  return response
}

async function getSingleSeasonTablesWithBonusPointsHome() {
  const response = await api.get(
    '/api/tables/league/2001?table=home&women=false'
  )
  return response
}
async function getSingleSeasonTablesMixGroups() {
  const response = await api.get(
    '/api/tables/league/1984?table=all&women=false'
  )
  return response
}

async function getSingleSeasonPlayoff() {
  const response = await api.get('/api/tables/playoff/2023?women=false')
  return response
}
