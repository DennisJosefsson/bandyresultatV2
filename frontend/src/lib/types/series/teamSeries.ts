import { z } from 'zod'
export const newTeamSeries = z.object({
  serieId: z.number(),
  teamId: z.number(),
})
