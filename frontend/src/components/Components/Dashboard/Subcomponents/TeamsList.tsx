import { Button } from '@/components/ui/button'
import { useDeleteTeamMutation } from '@/lib/hooks/dataHooks/teams/useDeleteTeamMutation'
import { TeamAttributes } from '@/lib/types/teams/teams'
import { setTeam } from '@/lib/zustand/dashboard/teamStore'
import { getRouteApi, useNavigate } from '@tanstack/react-router'

const route = getRouteApi('/_layout/dashboard/teams/')

const TeamsList = () => {
  const women = route.useSearch({ select: (search) => search.women })
  const teams = route.useLoaderData().filter((team) => team.women === women)
  const navigate = useNavigate({ from: '/dashboard/teams' })

  const mutation = useDeleteTeamMutation()

  const onDelete = (teamId: number) => {
    mutation.mutate({ teamId })
  }

  const onClick = (team: TeamAttributes) => {
    setTeam(team)
    navigate({ to: '/dashboard/addTeams', search: (prev) => ({ ...prev }) })
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
              <Button size="sm" onClick={() => onClick(team)}>
                Ändra
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => team.teamId && onDelete(team.teamId)}
              >
                Ta bort
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TeamsList
