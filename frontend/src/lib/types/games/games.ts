import { z } from 'zod'

export const game = z.object({
  gameId: z.number().int().positive(),
  seasonId: z.number(),
  homeTeamId: z.coerce.number(),
  awayTeamId: z.coerce.number(),
  homeGoal: z.number(),
  awayGoal: z.number(),
  result: z.string(),
  halftimeResult: z.string(),
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

export const bulkGame = z.object({
  games: z.array(
    z.object({
      date: z.string(),
      homeTeam: z.string(),
      homeTeamId: z.string().refine((val) => {
        if (val === 'Fel namn') return false
        return true
      }),
      awayTeam: z.string(),
      awayTeamId: z.string().refine((val) => {
        if (val === 'Fel namn') return false
        return true
      }),
      seasonId: z.number(),
      category: z.string(),
      group: z.string(),
      women: z.boolean(),
      serieId: z.number().optional().nullable(),
    })
  ),
})
