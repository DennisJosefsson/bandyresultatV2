import { z } from 'zod'

export const metadata = z.object({
  metadataId: z.number().optional(),
  seasonId: z.number(),
  name: z.string(),
  year: z.string(),
  winnerId: z.coerce.number().nullable(),
  winnerName: z.string(),
  hostCity: z.string(),
  finalDate: z.string(),
  northSouth: z.boolean(),
  multipleGroupStages: z.boolean(),
  eight: z.boolean(),
  quarter: z.boolean(),
  semi: z.boolean(),
  final: z.boolean(),
  comment: z.string().optional(),
})
