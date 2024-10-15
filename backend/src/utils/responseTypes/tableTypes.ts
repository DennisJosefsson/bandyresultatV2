import { z } from 'zod'

export const miniTableItem = z.object({
  teamId: z.number(),
  women: z.boolean(),
  category: z.string(),
  group: z.string(),
  team: z.object({
    casualName: z.string(),
    name: z.string(),
    shortName: z.string(),
    teamId: z.number(),
  }),
  season: z.object({
    seasonId: z.number(),
    year: z.string(),
  }),
})

const tableItem = z.object({
  category: z.string(),
  group: z.string(),
  team: z.object({
    casualName: z.string(),
    name: z.string(),
    shortName: z.string(),
    teamId: z.number(),
  }),
  season: z.object({
    seasonId: z.number(),
    year: z.string(),
  }),

  teamId: z.number(),
  totalDraws: z.coerce.number(),
  totalGames: z.coerce.number(),
  totalGoalDifference: z.coerce.number(),
  totalGoalsConceded: z.coerce.number(),
  totalGoalsScored: z.coerce.number(),
  totalLost: z.coerce.number(),
  totalPoints: z.coerce.number(),
  totalWins: z.coerce.number(),
  women: z.boolean(),
})

export const leagueTable = z.array(tableItem)
export const miniTableItemArray = z.array(miniTableItem)
export type TableItem = z.infer<typeof tableItem>
export type MiniTableItemArray = z.infer<typeof miniTableItemArray>
export type LeagueTableType = z.infer<typeof leagueTable>

export const fiveSeasonsLeagueTable = z.array(
  z.object({
    category: z.string(),
    season: z.object({
      seasonId: z.number(),
      year: z.string(),
    }),

    totalDraws: z.coerce.number(),
    totalGames: z.coerce.number(),
    totalGoalDifference: z.coerce.number(),
    totalGoalsConceded: z.coerce.number(),
    totalGoalsScored: z.coerce.number(),
    totalLost: z.coerce.number(),
    totalPoints: z.coerce.number(),
    totalWins: z.coerce.number(),
  })
)

export type FiveSeasonsLeagueTableType = z.infer<typeof fiveSeasonsLeagueTable>

export const maratonTableSchema = z.array(
  z.object({
    team: z.object({
      casualName: z.string(),
      name: z.string(),
      shortName: z.string(),
      teamId: z.number(),
      women: z.boolean(),
    }),

    women: z.boolean(),
    teamId: z.number(),
    totalDraws: z.coerce.number(),
    totalGames: z.coerce.number(),
    totalGoalDifference: z.coerce.number(),
    totalGoalsConceded: z.coerce.number(),
    totalGoalsScored: z.coerce.number(),
    totalLost: z.coerce.number(),
    totalPoints: z.coerce.number(),
    totalWins: z.coerce.number(),
  })
)

export const singleTeamTable = z.array(
  z.object({
    category: z.string(),
    totalDraws: z.coerce.number(),
    totalGames: z.coerce.number(),
    totalGoalDifference: z.coerce.number(),
    totalGoalsConceded: z.coerce.number(),
    totalGoalsScored: z.coerce.number(),
    totalLost: z.coerce.number(),
    totalPoints: z.coerce.number(),
    totalWins: z.coerce.number(),
  })
)

export const compareTable = z.object({
  team: z.object({
    casualName: z.string(),
    name: z.string(),
    shortName: z.string(),
    teamId: z.number(),
  }),
  opponent: z.object({
    casualName: z.string(),
    name: z.string(),
    shortName: z.string(),
    teamId: z.number(),
  }),
  category: z.string(),
  teamId: z.number(),
  opponentId: z.number(),
  totalDraws: z.coerce.number(),
  totalGames: z.coerce.number(),
  totalGoalDifference: z.coerce.number(),
  totalGoalsConceded: z.coerce.number(),
  totalGoalsScored: z.coerce.number(),
  totalLost: z.coerce.number(),
  totalPoints: z.coerce.number(),
  totalWins: z.coerce.number(),
  serie: z.object({ level: z.number() }),
})

export const compareCategoryTeamTables = z.array(compareTable)

export const compareAllTeamTables = z.array(
  z.object({
    team: z.object({
      casualName: z.string(),
      name: z.string(),
      shortName: z.string(),
      teamId: z.number(),
    }),
    opponent: z.object({
      casualName: z.string(),
      name: z.string(),
      shortName: z.string(),
      teamId: z.number(),
    }),
    teamId: z.number(),
    opponentId: z.number(),
    totalDraws: z.coerce.number(),
    totalGames: z.coerce.number(),
    totalGoalDifference: z.coerce.number(),
    totalGoalsConceded: z.coerce.number(),
    totalGoalsScored: z.coerce.number(),
    totalLost: z.coerce.number(),
    totalPoints: z.coerce.number(),
    totalWins: z.coerce.number(),
  })
)

export const newCompareObject = z.array(
  z.object({
    team: z.object({
      casualName: z.string(),
      name: z.string(),
      shortName: z.string(),
      teamId: z.number(),
    }),
    teamId: z.number(),
    totalDraws: z.coerce.number(),
    totalGames: z.coerce.number(),
    totalGoalDifference: z.coerce.number(),
    totalGoalsConceded: z.coerce.number(),
    totalGoalsScored: z.coerce.number(),
    totalLost: z.coerce.number(),
    totalPoints: z.coerce.number(),
    totalWins: z.coerce.number(),
  })
)

export const parseFirstLast = z.array(
  z.object({
    date: z.string(),
    home_name: z.string(),
    away_name: z.string(),
    game_id: z.number(),
    result: z.string(),
    ranked_first_games: z.string(),
    ranked_last_games: z.string(),
  })
)
