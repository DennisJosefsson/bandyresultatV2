import { z } from 'zod'
import { searchResultTeamgameObject } from './games'

export const searchParamsObject = z.object({
  categoryArray: z.array(z.string()).optional(),
  order: z.string().optional(),
  limit: z.number().optional(),
  result: z.string().optional(),
  gameResult: z.string().optional(),
  goalsScored: z.number().optional(),
  goalsScoredOperator: z.string().optional(),
  goalsConceded: z.number().optional(),
  goalsConcededOperator: z.string().optional(),
  goalDiff: z.number().optional(),
  goalDiffOperator: z.string().optional(),
  startSeason: z.number().optional(),
  endSeason: z.number().optional(),
  team: z.number().optional(),
  opponent: z.number().optional(),
  inputDate: z.string().optional(),
  selectedGender: z.string().optional(),
  homeGame: z.string().optional(),
  orderVar: z.string().optional(),
  search: z.boolean().optional(),
})

export const searchResponseObject = z.object({
  searchResult: z.array(searchResultTeamgameObject),
})

const searchParamsFields = searchParamsObject.keyof()

export type SearchParamsObject = z.infer<typeof searchParamsObject>
export type SearchResponseObject = z.infer<typeof searchResponseObject>
export type SearchParamsFields = z.infer<typeof searchParamsFields>
