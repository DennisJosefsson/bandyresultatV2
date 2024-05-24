import { SingleTeam } from '@/lib/types/teams/teams'
import useTeampreferenceContext from '@/lib/hooks/contextHooks/useTeampreferenceContext'
import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle } from '@/components/ui/card'

const TeamHeader = ({ team, teamId }: { team: SingleTeam; teamId: number }) => {
  const { favTeams, favTeamsDispatch } = useTeampreferenceContext()
  return (
    <CardHeader>
      <div className="flex flex-row items-center justify-between">
        <CardTitle>{team.team.name}</CardTitle>

        <div>
          {favTeams.includes(teamId) && (
            <Button
              onClick={() =>
                favTeamsDispatch({ type: 'ADD_TEAM', teamId: teamId })
              }
              size="sm"
            >
              Ta bort favorit
            </Button>
          )}
          {!favTeams.includes(teamId) && (
            <div>
              <Button
                onClick={() =>
                  favTeamsDispatch({ type: 'REMOVE_TEAM', teamId: teamId })
                }
                size="sm"
              >
                Favoritlag
              </Button>
            </div>
          )}
        </div>
      </div>
    </CardHeader>
  )
}

export default TeamHeader
