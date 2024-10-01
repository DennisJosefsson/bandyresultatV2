import { z } from 'zod'
import { serie } from '../series/series'
import { teamAndSeason } from '../teamSeason/teamAndSeason'

export const gameFormData = z.object({
  teams: z.array(teamAndSeason),
  series: z.array(serie),
})
