import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDeleteTeamSeasonMutation } from '@/lib/hooks/dataHooks/teams/useDeleteTeamSeasonMutation'
import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/')

const Teams = () => {
  const { teams } = route.useLoaderData()
  const navigate = route.useNavigate()
  const { seasonId } = route.useParams()
  const women = route.useSearch({ select: (search) => search.women })
  const mutation = useDeleteTeamSeasonMutation()
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle>Lag</CardTitle>
          <div className="flex flex-row gap-2">
            <Button
              onClick={() => {
                navigate({
                  to: '/dashboard/season/$seasonId/teamseason',
                  params: { seasonId: seasonId },
                  search: { women: women },
                })
              }}
              size="sm"
            >
              Lägg till lag
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 text-sm">
          <div>
            {teams.map((team) => {
              return (
                <div
                  key={team.teamId}
                  className="flex flex-row justify-between mb-1"
                >
                  <div>{team.team.casualName}</div>
                  <div>
                    <Button
                      onClick={() =>
                        team.teamseasonId &&
                        mutation.mutate({
                          teamSeasonId: team.teamseasonId,
                        })
                      }
                      size="sm"
                      variant="destructive"
                    >
                      Ta bort
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Teams
