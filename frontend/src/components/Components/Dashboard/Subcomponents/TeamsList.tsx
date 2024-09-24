import { Button } from '@/components/ui/button'
import { TeamAttributes } from '@/lib/types/teams/teams'
import { getRouteApi, Outlet, useNavigate } from '@tanstack/react-router'

const route = getRouteApi('/_layout/dashboard/teams/')

const TeamsList = () => {
  const women = route.useSearch({ select: (search) => search.women })
  const teams = route.useLoaderData().filter((team) => team.women === women)
  const navigate = useNavigate({ from: '/dashboard/teams' })

  const deleteButtonOnClick = (teamId: number) => {
    navigate({
      to: '/dashboard/teams/$teamId/delete',
      params: { teamId },
      search: { women },
    })
  }

  const onClick = (team: TeamAttributes) => {
    if (team.teamId === null) return

    navigate({
      to: '$teamId/edit',
      params: { teamId: team.teamId },
      search: (prev) => ({ ...prev }),
    })
  }

  return (
    <div className="grid grid-cols-4 gap-6 mt-2">
      {teams.map(
        (
          team: {
            teamId: number | null
            name: string
            city: string
            casualName: string
            shortName: string
            women: boolean
            lat: number | null
            long: number | null
            countyId: number
            municipalityId: number | null
          } & {
            seasonteam: {
              year: string
              seasonId: number
              teamseason: { qualification: boolean | null }
            }[]
          }
        ) => {
          return (
            <div
              key={team.teamId}
              className="flex flex-row justify-between text-sm items-center"
            >
              <span>{team.name}</span>
              <div className="flex flex-row gap-2">
                <Button size="sm" onClick={() => onClick(team)}>
                  Ändra
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    team.teamId && deleteButtonOnClick(team.teamId)
                  }
                >
                  Ta bort
                </Button>
              </div>
            </div>
          )
        }
      )}
      <Outlet />
    </div>
  )
}

export default TeamsList
