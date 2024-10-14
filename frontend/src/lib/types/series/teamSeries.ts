import { z } from 'zod'
import { team } from '../teams/teams'
export const newTeamSeries = z.object({
  serieId: z.number(),
  teamId: z.number(),
})

export const teamSerieWithTeam = z.object({
  teamseriesId: z.number(),
  serieId: z.number(),
  teamId: z.number(),
  team: team,
})
