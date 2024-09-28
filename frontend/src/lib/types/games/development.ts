import { z } from 'zod'
import { serie } from '../series/series'
import { gameObjectWithSeason } from './games'

export const developmentTable = z.object({
  teamId: z.number(),
  casualName: z.string(),
  table: z.object({
    position: z.number(),
    games: z.number(),
    wins: z.number(),
    draws: z.number(),
    lost: z.number(),
    scoredGoals: z.number(),
    concededGoals: z.number(),
    points: z.number(),
  }),
})

export const developmentDates = z.array(
  z.object({
    date: z.string(),
    games: z.array(gameObjectWithSeason),
    table: z.array(developmentTable),
  })
)

export const developmentData = z.object({
  length: z.number(),
  games: z.array(
    z.object({
      group: z.string(),
      serieName: z.string(),
      dates: developmentDates,
    })
  ),
  series: z.array(serie),
})
