import { z } from 'zod'
import { serie } from '../series/series'
import { staticTable } from '../tables/tables'
import { teamAndSeasonAttributes } from '../teams/teams'

export const season = z.object({
  seasonId: z.number(),
  year: z.string(),
  women: z.boolean(),
})

const newSeason = season.and(
  z.object({
    series: z.array(serie),
    teams: z.array(teamAndSeasonAttributes),
    tables: z.array(staticTable),
  })
)

export const newSeasonReturn = z.object({
  menSeason: newSeason,
  womenSeason: newSeason,
  newSeries: z.array(serie),
})

export const paginatedSeasons = z.object({
  rows: z.array(season),
  count: z.number(),
})
