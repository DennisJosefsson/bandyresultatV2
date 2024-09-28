import { z } from 'zod'

export const season = z.object({
  seasonId: z.number(),
  year: z.string(),
  women: z.boolean(),
})

export const paginatedSeasons = z.object({
  rows: z.array(season),
  count: z.number(),
})
