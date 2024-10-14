import { z } from 'zod'
import { season } from '../season/seasons'
import { table } from '../tables/tables'
import { team, teamAttributes } from './teams'

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
    table.extend({
      team: team,
      season: season,
    })
  ),
})

export const singleTeam = z.object({
  team: teamAttributes,
  tables: z.array(
    table.extend({
      team: team,
      season: season,
    })
  ),
  sortedFiveSeasons: z.array(fiveSeason),
  finalsAndWinsString: z.string(),
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
  playoffCountString: z.string(),
  seasonString: z.string(),
  chartDataLength: z.number(),
  barChartData: z.array(barChartType),
  renderData: z.array(z.array(lineChartType)),
})
