import { z } from 'zod'
import { compareCategoryTeamTable, table } from '../tables/tables'
import { team } from './teams'

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

export const latestWin = z.array(
  z.object({
    gameId: z.number(),
    date: z.string(),
    result: z.string(),
    homeName: z.string(),
    awayName: z.string(),
  })
)

export const compareResponseObject = z.object({
  categoryData: z.array(
    z.object({
      level: z.string(),
      levelName: z.string(),
      tables: z.array(
        z.object({
          category: z.string(),
          tables: z.array(compareCategoryTeamTable),
        })
      ),
    })
  ),
  allData: z.array(compareCategoryTeamTable),
  sortedData: z.array(table.and(z.object({ team }))),
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
  firstDivisionSeasonsSince1931: z.array(
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
  allDbSeasons: z.array(
    z.object({
      seasons: z.string(),
      team: z.number(),
      casual_name: z.string(),
    })
  ),
  firstDivisionSeasons: z.array(
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
  latestHomeWin: latestWin,
  latestAwayWin: latestWin,
})

export const compareFormState = z
  .object({
    teamArray: z
      .array(z.number())
      .max(4, { message: 'Max max 4 lag' })
      .min(2, { message: 'Välj minst 2 lag' })
      .optional(),
    categoryArray: z
      .array(z.string())
      .min(1, { message: 'Välj minst en matchkategori' })
      .optional(),
    startSeason: z.number().optional(),
    endSeason: z.number().optional(),
    women: z.boolean().optional(),
  })
  .refine((arg) => Number(arg.startSeason) <= Number(arg.endSeason), {
    message: 'Första säsong kan inte komma efter sista säsong.',
    path: ['startSeason'],
  })
