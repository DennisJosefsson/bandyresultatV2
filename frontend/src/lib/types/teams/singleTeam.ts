import { z } from 'zod'
import { groupArray } from '../games/gameObject'
import { season } from '../season/seasons'
import { serie } from '../series/series'
import { groupTable, staticGroupTable } from '../tables/seasonTable'
import { table } from '../tables/tables'
import { team, teamAttributes } from './teams'

export const streakType = z.object({
  team: z.number(),
  name: z.string(),
  gameCount: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  women: z.boolean(),
})

const streaks = z.object({
  streakObjectsLength: z.number(),
  noWinStreak: z.array(streakType),
  unbeatenStreak: z.array(streakType),
  winStreak: z.array(streakType),
  drawStreak: z.array(streakType),
  losingStreak: z.array(streakType),
  playoffStreak: z.array(
    z.object({
      streakLength: z.number(),
      startYear: z.string(),
      endYear: z.string(),
    })
  ),
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

export const lineChartType = z.object({
  year: z.string(),
  tick: z.string(),
  dataPoint: z.number(),
})

export const barChartType = z.object({
  year: z.string(),
  position: z.number(),
  points: z.number(),
  dataPoint: z.number(),
})

export const fiveSeason = z.object({
  season: z.string(),
  tables: z.array(
    table
      .extend({
        team: team,
        season: season,
        serie: serie,
      })
      .omit({ category: true })
  ),
})

export const singleTeam = z.object({
  team: teamAttributes,
  tables: z.array(
    z.object({
      level: z.string(),
      levelName: z.string(),
      tables: z.array(
        z.object({
          category: z.string(),
          categoryName: z.string(),
          tables: table.extend({
            team: team,
            season: season,
            serie: serie,
          }),
        })
      ),
    })
  ),
  sortedFiveSeasons: z.array(fiveSeason),
  finalsAndWinsString: z.string(),
  streaks,
  playoffCountString: z.string(),
  seasonString: z.string(),
  chartDataLength: z.number(),
  barChartData: z.array(barChartType),
  renderData: z.array(z.array(lineChartType)),
})

const singleTeamSeasonItem = z.object({
  seasonId: z.number(),
  year: z.string(),
})
export const singleTeamSeasons = z.object({
  seasons: z.array(singleTeamSeasonItem),
  rest: z.array(singleTeamSeasonItem),
})

const seasonItem = z.object({
  year: z.string(),
  seasonId: z.number(),
})

const seasonItemOrUndefined = z
  .object({
    year: z.string(),
    seasonId: z.number(),
  })
  .optional()

export const singleTeamTeamseason = z.object({
  firstSeason: seasonItem,
  lastSeason: seasonItem,
  previousSeason: seasonItemOrUndefined,
  nextSeason: seasonItemOrUndefined,
  team,
  seasonYear: z.string(),
  games: z.object({
    playedGames: groupArray,
    unplayedGames: groupArray,
  }),
  tables: z.array(groupTable),
  staticTables: z.array(staticGroupTable),
})
