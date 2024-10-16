import { z } from 'zod'
import { searchResult } from './searchResult'

export const searchParams = z.object({
  categoryArray: z.array(z.string()).optional().catch(undefined),
  order: z.string().optional().catch(undefined),
  limit: z.number().optional().catch(undefined),
  result: z.string().optional().catch(undefined),
  gameResult: z.string().optional().catch(undefined),
  goalsScored: z
    .number({ message: 'Antal gjorda mål måste vara en siffra.' })
    .optional()
    .catch(undefined),
  goalsScoredOperator: z.string().optional().catch(undefined),
  goalsConceded: z.number().optional().catch(undefined),
  goalsConcededOperator: z.string().optional().catch(undefined),
  goalDiff: z.number().optional().catch(undefined),
  goalDiffOperator: z.string().optional().catch(undefined),
  startSeason: z
    .number({ message: 'Första säsong måste vara ett årtal.' })
    .optional()
    .catch(undefined),
  endSeason: z
    .number({ message: 'Sista säsong måste vara ett årtal.' })
    .optional()
    .catch(undefined),
  teamId: z.number().optional().catch(undefined),
  opponentId: z.number().optional().catch(undefined),
  inputDate: z.string().optional().catch(undefined),
  selectedGender: z.string().optional().catch(undefined),
  homeGame: z.string().optional().catch(undefined),
  orderVar: z.string().optional().catch(undefined),
  submit: z.boolean().optional().catch(undefined),
})

export const searchResponse = z.object({
  searchResult: z.array(searchResult),
})

const searchParamsFields = searchParams.keyof()

export type SearchParamsFields = z.infer<typeof searchParamsFields>
