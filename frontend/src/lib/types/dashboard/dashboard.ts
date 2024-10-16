import { z } from 'zod'
import { metadata } from '../metadata/metadata'
import { season } from '../season/seasons'
import { serie } from '../series/series'
import { staticTable } from '../tables/seasonTable'
import { team } from '../teams/teams'
import { dashboardTeamSeason } from './dashboardTeamseason'

export const dashboardSingleSeason = z.object({
  season: season,
  metadata: metadata,
  teams: z.array(dashboardTeamSeason),
  series: z.array(serie),
})

export const dashboardData = z.object({
  women: z.boolean().nullable(),
  count: z.number(),
})

export const dashboardDataObjects = z.object({
  gameCount: z.array(dashboardData),
  seasonCount: z.array(dashboardData),
  teamCount: z.array(dashboardData),
  goalCount: z.array(dashboardData),
})

export const dashboardSingleSeries = serie.extend({
  teams: z.array(team),
  tables: z.array(staticTable),
})
