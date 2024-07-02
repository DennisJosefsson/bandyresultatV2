import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import useGetMetaData from '@/lib/hooks/dataHooks/season/useGetMetadata'
import { useGetSingleSeason } from '@/lib/hooks/dataHooks/season/useGetSingleSeason'
import {
  setDashboardTeamSeason,
  useDashboardTeamSeasonStore,
} from '@/lib/zustand/dashboard/teamSeasonStore'
import Loading from '@/components/Components/Common/Loading'
import { Navigate, createFileRoute } from '@tanstack/react-router'
import { useDeleteTeamSeasonMutation } from '@/lib/hooks/dataHooks/teams/useDeleteTeamSeasonMutation'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_layout/dashboard/season/$seasonId/')({
  component: SeasonIndex,
  pendingComponent: Loading,
  errorComponent: OnErrorNavigate,
})

function SeasonIndex() {
  const { seasonId } = Route.useParams()
  const navigate = Route.useNavigate()
  const dashboardData = useDashboardTeamSeasonStore(
    (state) => state.dashboardTeamSeason
  )
  const { data } = useGetSingleSeason(dashboardData.year.slice(-4))
  const { data: metadata } = useGetMetaData(dashboardData.year)
  const mutation = useDeleteTeamSeasonMutation()
  const season = data.find((season) => season.women === dashboardData.women)
  const metadataObject = metadata?.find(
    (item) => item.seasonId === season?.seasonId
  )

  const teamSeasonData = season?.teams?.map((team) => team.teamseason)

  return (
    <>
      {season ? (
        <div className="mt-4">
          <div className="mb-2">
            <h2 className="text-lg font-semibold">{`${season.year} - ${season.women ? 'Damer' : 'Herrar'}`}</h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Card>
              <CardHeader>
                <CardTitle>Lag</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 text-sm">
                  <div>
                    <p
                      className="cursor-pointer text-accent-foreground"
                      onClick={() => {
                        setDashboardTeamSeason({
                          ...dashboardData,
                          teamSeasonData: teamSeasonData,
                        })
                        navigate({
                          to: '/dashboard/season/$seasonId/teamseason',
                          params: { seasonId: seasonId },
                        })
                      }}
                    >
                      Lägg till lag
                    </p>
                    <p className="cursor-pointer text-accent-foreground">
                      Lägg till matcher
                    </p>
                  </div>
                  <div>
                    {season.teams.map((team) => {
                      return (
                        <div
                          key={team.teamId}
                          className="flex w-60 flex-row justify-between mb-1"
                        >
                          <div>{team.casualName}</div>
                          <div>
                            <Button
                              onClick={() =>
                                team.teamseason.teamseasonId &&
                                mutation.mutate({
                                  teamSeasonId: team.teamseason.teamseasonId,
                                })
                              }
                              size="sm"
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
            <Card>
              <CardHeader>
                <CardTitle>Serier</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 text-sm">
                  <div>
                    <p className="cursor-pointer text-accent-foreground">
                      Lägg till serie
                    </p>
                  </div>
                  <div>
                    {season.series.map((serie) => {
                      return (
                        <div
                          key={serie.serieId}
                          className="flex w-60 flex-row justify-between"
                        >
                          <div>{serie.serieName}</div>
                          <div className="cursor-pointer">Ändra</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 text-sm">
                  <div>
                    <p className="cursor-pointer text-accent-foreground">
                      Ändra metadata
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center justify-between">
                      <div>Finalstad:</div>{' '}
                      <div>{metadataObject?.hostCity}</div>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <div>Finaldatum:</div>{' '}
                      <div>{metadataObject?.finalDate}</div>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <div>SM-Guld:</div>
                      <div> {metadataObject?.winnerName}</div>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <div>Kommentar:</div> <div>{metadataObject?.comment}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : null}
    </>
  )
}

function OnErrorNavigate() {
  const { seasonId } = Route.useParams()
  return (
    <Navigate
      to="/dashboard/season/$seasonId/teamseason"
      params={{ seasonId: seasonId }}
    />
  )
}
