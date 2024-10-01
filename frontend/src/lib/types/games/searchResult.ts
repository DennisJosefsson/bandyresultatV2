import { z } from 'zod'
import { team } from '../teams/teams'
import { teamGame } from './teamGame'

export const searchResult = teamGame.and(
  z.object({
    lag: team.pick({
      teamId: true,
      name: true,
      casualName: true,
      shortName: true,
    }),
    opp: team.pick({
      teamId: true,
      name: true,
      casualName: true,
      shortName: true,
    }),

    game: z.object({ result: z.string() }),
  })
)
