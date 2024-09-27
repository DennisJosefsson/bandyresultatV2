import { z } from 'zod'
import { teamGame } from '../games/games'
import { seasonTable } from '../tables/tables'

export const teamIdFromParams = z.coerce.number().int().positive()
export const compareTeamsSeasonId = z.coerce.number().int().positive()

export const team = z.object({
  teamId: z.number(),
  name: z.string(),
  city: z.string(),
  casualName: z.string(),
  shortName: z.string(),
  women: z.boolean(),
  lat: z.coerce.number().nullable(),
  long: z.coerce.number().nullable(),
  countyId: z.coerce.number(),
  municipalityId: z.coerce.number().nullable(),
})

export const newTeam = team.omit({ teamId: true })

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

export const reducedCompareFormState = z.object({
  teamArray: z.array(z.number()).optional(),
  categoryArray: z.array(z.string()),
  startSeason: z.number(),
  endSeason: z.number(),
  women: z.boolean(),
})

export const validateSearchParams = z
  .object({
    teamArray: z
      .array(z.number())
      .max(4, { message: 'Max max 4 lag' })
      .min(2, { message: 'Välj minst 2 lag' }),
    categoryArray: z
      .array(z.string())
      .min(1, { message: 'Välj minst en matchkategori' }),
    startSeason: z.number(),
    endSeason: z.number(),
    women: z.boolean(),
    link: z.boolean(),
  })
  .refine((arg) => Number(arg.startSeason) <= Number(arg.endSeason), {
    message: 'Första säsong kan inte komma efter sista säsong.',
    path: ['startSeason'],
  })

export const teamAttributes = team.and(
  z.object({
    seasonteam: z.array(
      z.object({
        year: z.string(),
        seasonId: z.number(),
        teamseason: z.object({ qualification: z.boolean().nullable() }),
      })
    ),
  })
)

// export const teamAttributes = z.object({
//   teamId: z.number().nullable(),
//   name: z.string(),
//   city: z.string(),
//   casualName: z.string(),
//   shortName: z.string(),
//   women: z.boolean(),
//   lat: z.number().nullable(),
//   long: z.number().nullable(),
//   countyId: z.number(),
//   municipalityId: z.number().nullable(),
//   seasonteam: z.array(
//     z.object({
//       year: z.string(),
//       seasonId: z.number(),
//       teamseason: z.object({ qualification: z.boolean().nullable() }),
//     })
//   ),
// })

export const teamSeasonAttributes = z.object({
  teamseasonId: z.number().optional(),
  seasonId: z.number(),
  teamId: z.number(),
  tableId: z.number().nullable().optional(),
  women: z.boolean(),
  qualification: z.boolean(),
  negQualification: z.boolean().optional(),
  promoted: z.boolean().optional(),
  relegated: z.boolean().optional(),
  position: z.number().optional().nullable(),
  points: z.number().optional().nullable(),
  playoff: z.boolean().optional(),
  eight: z.boolean().optional(),
  quarter: z.boolean().optional(),
  semi: z.boolean().optional(),
  final: z.boolean().optional(),
  gold: z.boolean().optional(),
})

export const dashboardTeamSeason = teamSeasonAttributes.and(
  z.object({ team: team })
)

export const teamAndSeasonAttributes = z.object({
  teamId: z.number(),
  name: z.string(),
  city: z.string(),
  casualName: z.string(),
  shortName: z.string(),
  women: z.boolean().optional(),
  lat: z.number().optional().nullable(),
  long: z.number().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  teamseason: teamSeasonAttributes,
})

export const streakType = z.object({
  team: z.number(),
  name: z.string(),
  game_count: z.number(),
  start_date: z.string(),
  end_date: z.string(),
  women: z.boolean(),
})

export const teamChartType = z.object({
  seasonId: z.number(),
  year: z.string(),
  teamseasonId: z.number(),
  qualification: z.boolean().nullable(),
  negQualification: z.boolean().nullable(),
  promoted: z.boolean().nullable(),
  relegated: z.boolean().nullable(),
  position: z.number().nullable(),
  points: z.number().nullable(),
  playoff: z.boolean().nullable(),
  eight: z.boolean().nullable(),
  quarter: z.boolean().nullable(),
  semi: z.boolean().nullable(),
  final: z.boolean().nullable(),
  gold: z.boolean().nullable(),
})

export const singleTeam = z.object({
  team,
  tables: z.array(seasonTable),
  sortedFiveSeasons: z.array(
    z.object({
      season: z.string(),
      tables: z.array(seasonTable),
    })
  ),
  finalsAndWins: z.array(teamGame),
  noWinStreak: z.array(streakType),
  unbeatenStreak: z.array(streakType),
  winStreak: z.array(streakType),
  drawStreak: z.array(streakType),
  losingStreak: z.array(streakType),
  playoffStreak: z.array(
    z.object({
      streak_length: z.number(),
      start_year: z.string(),
      end_year: z.string(),
    })
  ),
  playoffCount: z.array(z.object({ playoff_count: z.string() })),
  chartData: z.array(teamChartType),
})
