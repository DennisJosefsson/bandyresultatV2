import { z } from 'zod'
import { metadata } from '../metadata/metadata'
import { serie } from '../series/series'
import { staticTable } from '../tables/seasonTable'
import { teamAndSeason } from '../teamSeason/teamAndSeason'
import { season } from './seasons'

export const singleSeason = season.and(
  z.object({
    teams: z.array(teamAndSeason),
    tables: z.array(staticTable),
    series: z.array(serie),
    metadata: metadata,
  })
)
