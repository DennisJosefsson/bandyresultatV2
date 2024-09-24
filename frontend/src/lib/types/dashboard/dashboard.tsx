import { z } from 'zod'
import { metadata } from '../metadata/metadata'
import { season } from '../season/seasons'
import { serieAttributes } from '../series/series'
import { dashboardTeamSeason } from '../teams/teams'

export const dashboardSingleSeason = z.object({
  season: season,
  metadata: metadata,
  teams: z.array(dashboardTeamSeason),
  series: z.array(serieAttributes),
})

export type DashboardSingleSeason = z.infer<typeof dashboardSingleSeason>
