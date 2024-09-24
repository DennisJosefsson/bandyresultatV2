import { z } from 'zod'
import { serieAttributes } from '../series/series'
import { staticSeasonTable } from '../tables/tables'
import { teamAndSeasonAttributes } from '../teams/teams'

const postNewSeasonType = z.object({
  seasonId: z.number(),
  year: z.string(),
  women: z.boolean(),
  serieStructure: z.boolean().optional().nullable(),
})

export const season = z.object({
  seasonId: z.number(),
  year: z.string(),
  women: z.boolean(),
})

const seasonObject = z.object({
  seasonId: z.number(),
  year: z.string(),
  women: z.boolean(),
  series: z.array(serieAttributes),
  teams: z.array(teamAndSeasonAttributes),
  tables: z.array(staticSeasonTable),
})

export type Season = z.infer<typeof season>
export type SeasonObjectType = z.infer<typeof seasonObject>
export type PostNewSeasonType = z.infer<typeof postNewSeasonType>
