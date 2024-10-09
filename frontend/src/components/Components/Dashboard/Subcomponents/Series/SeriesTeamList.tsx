import { Button } from '@/components/ui/button'
import { dashboardSingleSeries } from '@/lib/types/dashboard/dashboard'
import { getRouteApi } from '@tanstack/react-router'
import { z } from 'zod'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/info/$serieId')

type SeriesTeamListProps = {
  teams: z.infer<typeof dashboardSingleSeries>['teams']
}

const SeriesTeamList = ({ teams }: SeriesTeamListProps) => {
  const navigate = route.useNavigate()

  if (teams.length === 0) return <h6 className="text-base">Lag saknas</h6>
  return (
    <div className="flex flex-col gap-2">
      <h6 className="text-base">Lag</h6>
      <ul>
        {teams.map((team) => {
          return (
            <li
              key={team.teamId}
              className="mb-1 text-sm flex flex-row justify-between"
            >
              <span>{team.name}</span>
              <Button
                size="sm"
                onClick={() =>
                  navigate({
                    to: '$teamId/newTable',
                    params: { teamId: team.teamId },
                    search: (prev) => ({ ...prev }),
                  })
                }
              >
                Ny tabell
              </Button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SeriesTeamList