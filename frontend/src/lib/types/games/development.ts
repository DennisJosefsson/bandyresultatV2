import { z } from 'zod'
import { serie } from '../series/series'
import { gameObjectWithSeason } from './games'

export const developmentData = z.object({
  length: z.number(),
  games: z.array(
    z.object({
      group: z.string(),
      serieName: z.string(),
      dates: z.array(
        z.object({
          date: z.string(),
          games: z.array(gameObjectWithSeason),
          table: z.array(
            z.object({
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
          ),
        })
      ),
    })
  ),
  series: z.array(serie),
})
