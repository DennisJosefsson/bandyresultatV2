import { z } from 'zod'

export const newGame = z.object({
  seasonId: z.number(),
  homeTeamId: z.coerce.number(),
  awayTeamId: z.coerce.number(),
  result: z
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultat, ny match' })
    .optional()
    .or(z.literal('')),
  halftimeResult: z
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel halvtidsresultat, ny match' })
    .optional()
    .or(z.literal('')),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Fel datum' }),
  category: z
    .enum(['qualification', 'regular', 'eight', 'quarter', 'semi', 'final'])
    .default('regular'),
  group: z.string().default('elitserien'),
  playoff: z.boolean().default(false),
  extraTime: z.boolean().default(false),
  penalties: z.boolean().default(false),
  women: z.boolean().default(false),
  serieId: z.number(),
  played: z.boolean().default(false),
})

export const editGame = z.object({
  gameId: z.number().int().positive(),
  seasonId: z.number(),
  homeTeamId: z.coerce.number(),
  awayTeamId: z.coerce.number(),
  result: z
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultat, ny match' })
    .optional()
    .or(z.literal('')),
  halftimeResult: z
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel halvtidsresultat, ny match' })
    .optional()
    .or(z.literal('')),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Fel datum' }),
  category: z
    .enum(['qualification', 'regular', 'eight', 'quarter', 'semi', 'final'])
    .default('regular'),
  group: z.string().default('elitserien'),
  playoff: z.boolean().default(false),
  extraTime: z.boolean().default(false),
  penalties: z.boolean().default(false),
  women: z.boolean().default(false),
  serieId: z.number(),
  played: z.boolean().default(false),
})
