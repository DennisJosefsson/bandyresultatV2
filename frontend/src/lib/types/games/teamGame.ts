import { z } from 'zod'

export const teamGame = z.object({
  gameId: z.number(),
  teamGameId: z.number(),
  teamId: z.number(),
  opponentId: z.number(),
  date: z.string(),
  scoredGoals: z.number(),
  concededGoals: z.number(),
  goalDifference: z.number(),
  totalGoals: z.number(),
  points: z.number(),
  win: z.boolean(),
  lost: z.boolean(),
  draw: z.boolean(),
  category: z.string(),
  group: z.string(),
  played: z.boolean(),
  homeGame: z.boolean(),
  qualificationGame: z.boolean(),
})
