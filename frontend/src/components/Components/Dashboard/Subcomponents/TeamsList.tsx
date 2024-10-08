import { Button } from '@/components/ui/button'
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

  const onClick = (teamId: number) => {
    navigate({
      to: '$teamId/edit',
      params: { teamId: teamId },
      search: (prev) => ({ ...prev }),
    })
  }

  return (
    <div className="grid grid-cols-4 gap-6 mt-2">
      {teams.map((team) => {
        return (
          <div
            key={team.teamId}
            className="flex flex-row justify-between text-sm items-center"
          >
            <span>{team.name}</span>
            <div className="flex flex-row gap-2">
              <Button size="sm" onClick={() => onClick(team.teamId)}>
                Ändra
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => deleteButtonOnClick(team.teamId)}
              >
                Ta bort
              </Button>
            </div>
          </div>
        )
      })}
      <Outlet />
    </div>
  )
}

export default TeamsList
