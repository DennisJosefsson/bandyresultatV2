import { z } from 'zod'
import { season } from '../season/seasons'
import { team } from '../teams/teams'
import { game } from './games'

export const gameObject = game.and(
  z.object({
    homeTeam: team.pick({
      teamId: true,
      name: true,
      casualName: true,
      shortName: true,
    }),
    awayTeam: team.pick({
      teamId: true,
      name: true,
      casualName: true,
      shortName: true,
    }),
  })
)

export const gameObjectWithSeason = gameObject.and(season)

export const dateObject = z.object({
  date: z.string(),
  games: z.array(gameObject),
})

export const groupArray = z.array(
  z.object({
    group: z.string(),
    name: z.string(),
    comment: z.string(),
    dates: z.array(dateObject),
  })
)
export const groupRecord = z.record(z.string(), groupArray)

export const seasonGames = z.object({
  hasLowerLevel: z.boolean(),
  played: groupRecord,
  unplayed: groupRecord,
  playedLength: z.number(),
  unplayedLength: z.number(),
})
