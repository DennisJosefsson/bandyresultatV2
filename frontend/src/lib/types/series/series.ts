import { z } from 'zod'

export const serie = z.object({
  serieId: z.number(),
  serieGroupCode: z.string(),
  serieCategory: z.string(),
  serieName: z.string(),
  serieStructure: z.array(z.number()).nullable().optional(),
  seasonId: z.number(),
  bonusPoints: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
})

export const newSerie = serie.omit({ serieId: true })
