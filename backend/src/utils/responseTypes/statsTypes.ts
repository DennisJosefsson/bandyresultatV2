import { z } from 'zod'

export const goalStatsObject = z.object({
  data: z.coerce.number(),
  season: z.object({
    seasonId: z.number(),
    year: z.string(),
  }),
})

export const goalStatsByCatObject = z.array(
  z.object({
    category: z.string(),
    data: z.coerce.number(),
    season: z.object({
      seasonId: z.number(),
      year: z.string(),
    }),
  })
)
