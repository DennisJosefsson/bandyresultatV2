import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle } from '@/components/ui/card'
import useTeampreferenceContext from '@/lib/hooks/contextHooks/useTeampreferenceContext'
import { SingleTeam } from '@/lib/types/teams/teams'
import { useMediaQuery } from 'usehooks-ts'

const TeamHeader = ({ team, teamId }: { team: SingleTeam; teamId: number }) => {
  const matches = useMediaQuery('(min-width: 430px)')
  const { favTeams, favTeamsDispatch } = useTeampreferenceContext()
  return (
    <CardHeader className="p-1 md:p-6">
      <div className="flex flex-row items-center justify-between">
        <CardTitle className="text-[10px] md:text-sm">
          {team.team.name}
        </CardTitle>

        <div>
          {favTeams.includes(teamId) && (
            <Button
              onClick={() =>
                favTeamsDispatch({ type: 'ADD_TEAM', teamId: teamId })
              }
              size={matches ? 'sm' : 'xxs'}
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
                size={matches ? 'sm' : 'xxs'}
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
