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
  .extend({
    tableId: z.number(),
    position: z.coerce.number(),
    serieId: z.number(),
    seasonId: z.number(),
    qualification: z.boolean(),
  })

const group = z.object({
  group: z.string(),
  name: z.string(),
  comment: z.string(),
  serieStructure: z.array(z.number()),
  level: z.number(),
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
  hasLowerLevel: z.boolean(),
  tables: z.array(groupTable),
  staticTables: z.array(staticGroupTable),
})

export const singleSeasonSubTables = singleSeasonTable.omit({
  hasLowerLevel: true,
})

export const newStaticTable = staticTable.omit({ tableId: true, team: true })
export const editStaticTable = staticTable.omit({ team: true })
