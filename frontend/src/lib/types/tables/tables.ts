import { z } from 'zod'

import { gameObject, gameObjectWithSeason } from '../games/gameObject'
import { team } from '../teams/teams'

export const table = z.object({
  category: z.string(),
  group: z.string(),
  teamId: z.number(),
  women: z.boolean(),
  totalGames: z.number(),
  totalWins: z.number(),
  totalDraws: z.number(),
  totalLost: z.number(),
  totalGoalsScored: z.number(),
  totalGoalsConceded: z.number(),
  totalGoalDifference: z.number(),
  totalPoints: z.number(),
})

export const result = z.object({
  result: z.string(),
  homeTeam: team.pick({
    casualName: true,
    name: true,
    shortName: true,
    teamId: true,
  }),
  awayTeam: team.pick({
    casualName: true,
    name: true,
    shortName: true,
    teamId: true,
  }),
})

export const playoffGroup = z.object({
  group: z.string(),
  result,
  games: z.array(gameObject),
})

export const singleSeasonPlayoff = z.object({
  final: z.array(gameObjectWithSeason),
  results: z.object({
    semiResults: z.array(playoffGroup),
    quarterResults: z.array(playoffGroup),
    eightResults: z.array(playoffGroup),
  }),
})

export const compareCategoryTeamTable = table.omit({ group: true }).and(
  z.object({
    team: team.pick({
      casualName: true,
      name: true,
      shortName: true,
      teamId: true,
    }),
    opponentId: z.number(),
    opponent: team.pick({
      casualName: true,
      name: true,
      shortName: true,
      teamId: true,
    }),
  })
)

export const compareAllTeamTables = table
  .omit({ group: true, category: true })
  .and(
    z.object({
      team: team.pick({
        casualName: true,
        name: true,
        shortName: true,
        teamId: true,
      }),
      opponent: team.pick({
        casualName: true,
        name: true,
        shortName: true,
        teamId: true,
      }),
    })
  )

export const newCompareObject = table.omit({ group: true, category: true }).and(
  z.object({
    team: team.pick({
      casualName: true,
      name: true,
      shortName: true,
      teamId: true,
    }),
  })
)

// export const newCompareObject = z.object({
//   lag: z.object({
//     shortName: z.string(),
//     name: z.string(),
//     casualName: z.string(),
//     teamId: z.number(),
//   }),
//   team: z.number(),
//   totalDraws: z.coerce.number(),
//   totalGames: z.coerce.number(),
//   totalGoalDifference: z.coerce.number(),
//   totalGoalsConceded: z.coerce.number(),
//   totalGoalsScored: z.coerce.number(),
//   totalLost: z.coerce.number(),
//   totalPoints: z.coerce.number(),
//   totalWins: z.coerce.number(),
// })

export const maratonTable = table
  .omit({ group: true, category: true })
  .and(z.object({ team }))

// export const maratonTable = z.object({
//   lag: z.object({
//     casualName: z.string(),
//     name: z.string(),
//     shortName: z.string(),
//     teamId: z.number(),
//   }),

//   women: z.boolean(),
//   team: z.number(),
//   totalDraws: z.coerce.number(),
//   totalGames: z.coerce.number(),
//   totalGoalDifference: z.coerce.number(),
//   totalGoalsConceded: z.coerce.number(),
//   totalGoalsScored: z.coerce.number(),
//   totalLost: z.coerce.number(),
//   totalPoints: z.coerce.number(),
//   totalWins: z.coerce.number(),
// })

// export type MaratonTabell = z.infer<typeof maratonTable>
