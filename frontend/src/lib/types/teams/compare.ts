import { z } from 'zod'
import { compareCategoryTeamTable } from '../tables/tables'

const rankedGames = z.array(
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

export const compareResponseObject = z.object({
  categoryData: z.object({
    category: z.string(),
    teams: z.array(compareCategoryTeamTable),
  }),
  golds: z.array(
    z.object({
      guld: z.string(),
      team: z.number(),
      casual_name: z.string(),
    })
  ),
  playoffs: z.array(
    z.object({
      playoffs: z.string(),
      team: z.number(),
      casual_name: z.string(),
    })
  ),
  seasons: z.array(
    z.object({
      seasons: z.string(),
      team: z.number(),
      casual_name: z.string(),
    })
  ),
  allPlayoffs: z.array(
    z.object({
      playoffs: z.string(),
      team: z.number(),
      casual_name: z.string(),
    })
  ),
  allSeasons: z.array(
    z.object({
      seasons: z.string(),
      team: z.number(),
      casual_name: z.string(),
    })
  ),
  firstGames: rankedGames,
  latestGames: rankedGames,
  seasonNames: z.array(z.object({ seasonId: z.number(), year: z.string() })),
  compareHeaderText: z.string(),
})
