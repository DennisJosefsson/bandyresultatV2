import { z } from 'zod'
import { season } from '../season/seasons'
import { table } from '../tables/tables'
import { team } from '../teams/teams'

export const seasonTable = table.extend({
  team: team,
  season: season,
})

export const staticTable = seasonTable
  .omit({ season: true, category: true })
  .extend({ tableId: z.number(), position: z.number() })

const group = z.object({
  group: z.string(),
  name: z.string(),
  comment: z.string(),
  serieStructure: z.array(z.number()),
})

export const groupTable = group.and(
  z.object({
    tables: z.array(seasonTable),
  })
)

export const staticGroupTable = group.and(
  z.object({
    tables: z.array(staticTable),
  })
)

export const singleSeasonTable = z.object({
  tables: z.array(groupTable),
  staticTables: z.array(staticGroupTable),
})
