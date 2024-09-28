import { z } from 'zod'
import { season } from '../season/seasons'
import { serie } from '../series/series'
import { team, teamAndSeasonAttributes } from '../teams/teams'

export const game = z.object({
  gameId: z.number().int().positive(),
  seasonId: z.number(),
  homeTeamId: z.coerce.number(),
  awayTeamId: z.coerce.number(),
  homeGoal: z.number(),
  awayGoal: z.number(),
  result: z
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultat, ny match' })
    .optional()
    .or(z.literal('')),
  halftimeResult: z
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel halvtidsresultat, ny match' })
    .optional()
    .or(z.literal('')),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Fel datum' }),
  category: z
    .enum(['qualification', 'regular', 'eight', 'quarter', 'semi', 'final'])
    .default('regular'),
  group: z.string().default('elitserien'),
  playoff: z.boolean().default(false),
  extraTime: z.boolean().default(false),
  penalties: z.boolean().default(false),
  women: z.boolean().default(false),
  serieId: z.number(),
  played: z.boolean().default(false),
})

export const newGame = game.omit({
  gameId: true,
  homeGoal: true,
  awayGoal: true,
})

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

// export const gameObject = z.object({
//   gameId: z.number().int().positive().optional(),
//   seasonId: z.number(),
//   homeTeamId: z.number(),
//   awayTeamId: z.number(),
//   homeTeam: z.object({
//     teamId: z.number(),
//     name: z.string(),
//     casualName: z.string(),
//     shortName: z.string(),
//   }),
//   awayTeam: z.object({
//     teamId: z.number(),
//     name: z.string(),
//     casualName: z.string(),
//     shortName: z.string(),
//   }),
//   result: z.string().optional(),
//   halftimeResult: z.string().optional(),
//   homeGoal: z.number().optional(),
//   awayGoal: z.number().optional(),
//   halftimeHomeGoal: z.number().optional(),
//   halftimeAwayGoal: z.number().optional(),
//   date: z.string().regex(/^\d{4}-\d{2}-{2}$/, { message: 'Fel datum' }),
//   category: z
//     .enum(['qualification', 'regular', 'eight', 'quarter', 'semi', 'final'])
//     .default('regular'),
//   group: z.string().default('Elitserien'),
//   playoff: z.boolean().default(false),
//   extraTime: z.boolean().default(false),
//   penalties: z.boolean().default(false),
//   women: z.boolean().default(false),
//   played: z.boolean().default(false).optional(),
// })

export const gameObjectWithSeason = gameObject.and(season)

export const teamGame = z.object({
  gameId: z.number(),
  teamGameId: z.number(),
  team: z.number(),
  opponent: z.number(),
  date: z.string(),
  scoredGoals: z.number(),
  concededGoals: z.number(),
  goalDifference: z.number(),
  totalGoals: z.number(),
  points: z.number(),
  win: z.boolean(),
  lost: z.boolean(),
  draw: z.boolean(),
  category: z.string(),
  group: z.string(),
  played: z.boolean(),
  homeGame: z.boolean(),
  qualificationGame: z.boolean(),
})

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

export const bulkGame = z.object({
  games: z.array(
    z.object({
      date: z.string(),
      homeTeam: z.string(),
      homeTeamId: z.string().refine((val) => {
        if (val === 'Fel namn') return false
        return true
      }),
      awayTeam: z.string(),
      awayTeamId: z.string().refine((val) => {
        if (val === 'Fel namn') return false
        return true
      }),
      seasonId: z.number(),
      category: z.string(),
      group: z.string(),
      women: z.boolean(),
      serieId: z.number().optional().nullable(),
    })
  ),
})

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
  played: groupRecord,
  unplayed: groupRecord,
  playedLength: z.number(),
  unplayedLength: z.number(),
})

export const gameFormData = z.object({
  teams: z.array(teamAndSeasonAttributes),
  series: z.array(serie),
})
