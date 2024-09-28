import { z } from 'zod'
import { team } from '../teams/teams'
import { teamSeason } from '../teamSeason/teamSeason'

export const dashboardTeamSeason = teamSeason.and(z.object({ team: team }))
