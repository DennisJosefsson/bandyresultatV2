import { z } from 'zod'
import { serie } from '../series/series'
import { staticTable } from '../tables/seasonTable'
import { teamAndSeason } from '../teamSeason/teamAndSeason'
import { season } from './seasons'

const newSeason = season.and(
  z.object({
    series: z.array(serie),
    teams: z.array(teamAndSeason),
    tables: z.array(staticTable),
  })
)

export const newSeasonReturn = z.object({
  menSeason: newSeason,
  womenSeason: newSeason,
  newSeries: z.array(serie),
})
