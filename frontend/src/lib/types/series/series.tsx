import { z } from 'zod'

export const serieAttributes = z.object({
  serieId: z.number(),
  serieGroupCode: z.string(),
  serieCategory: z.string(),
  serieName: z.string(),
  serieStructure: z.array(z.number()).nullable().optional(),
  seasonId: z.number(),
  bonusPoints: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
})

export const newSerie = serieAttributes.omit({ serieId: true })

export type SerieAttributes = z.infer<typeof serieAttributes>
export type NewSerie = z.infer<typeof newSerie>
