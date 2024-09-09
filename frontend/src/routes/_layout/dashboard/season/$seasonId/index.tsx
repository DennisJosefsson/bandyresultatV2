import Loading from '@/components/Components/Common/Loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useGetMetaData from '@/lib/hooks/dataHooks/season/useGetMetadata'
import { useGetSingleSeason } from '@/lib/hooks/dataHooks/season/useGetSingleSeason'
import { useDeleteTeamSeasonMutation } from '@/lib/hooks/dataHooks/teams/useDeleteTeamSeasonMutation'
import { sortOrder } from '@/lib/utils/constants'
import {
  setDashboard,
  useDashboardStore,
} from '@/lib/zustand/dashboard/dashboardStore'
import { Link, Navigate, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/season/$seasonId/')({
  component: SeasonIndex,
  pendingComponent: Loading,
  errorComponent: OnErrorNavigate,
})

function SeasonIndex() {
  const { seasonId } = Route.useParams()
  const navigate = Route.useNavigate()
  const dashboardData = useDashboardStore((state) => state.dashboard)
  const { data } = useGetSingleSeason(parseInt(dashboardData.year.slice(-4)))
  const { data: metadata } = useGetMetaData(dashboardData.year)
  const mutation = useDeleteTeamSeasonMutation()
  const season = data.find((season) => season.women === dashboardData.women)
  const metadataObject = metadata?.find(
    (item) => item.seasonId === season?.seasonId
  )

  const teamSeasonData = season?.teams

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
                <div className="flex flex-row justify-between items-center">
                  <CardTitle>Lag</CardTitle>
                  <div className="flex flex-row gap-2">
                    <Button
                      onClick={() => {
                        setDashboard({
                          ...dashboardData,
                          teamSeasonData: teamSeasonData,
                        })
                        navigate({
                          to: '/dashboard/season/$seasonId/teamseason',
                          params: { seasonId: seasonId },
                          search: { women: dashboardData.women },
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
                    {season.teams.map((team) => {
                      return (
                        <div
                          key={team.teamId}
                          className="flex flex-row justify-between mb-1"
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
            <Card>
              <CardHeader>
                <div className="flex flex-row justify-between items-center">
                  <CardTitle>Serier</CardTitle>
                  <Button
                    onClick={() => {
                      setDashboard({
                        ...dashboardData,
                        seriesData: undefined,
                      })
                      navigate({
                        to: '/dashboard/season/$seasonId/newseries',
                        params: { seasonId: seasonId },
                        search: { women: dashboardData.women },
                      })
                    }}
                    size="sm"
                  >
                    Lägg till serie
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 text-sm">
                  <div>
                    {season.series
                      .sort((a, b) => {
                        if (
                          sortOrder.indexOf(a.serieGroupCode) >
                          sortOrder.indexOf(b.serieGroupCode)
                        ) {
                          return 1
                        } else if (
                          sortOrder.indexOf(a.serieGroupCode) <
                          sortOrder.indexOf(b.serieGroupCode)
                        ) {
                          return -1
                        } else {
                          return 0
                        }
                      })
                      .map((serie) => {
                        if (!serie.serieId) return null
                        return (
                          <div
                            key={serie.serieId}
                            className="flex flex-row justify-between mb-1"
                          >
                            <div>{serie.serieName}</div>
                            <div className="flex flex-row gap-1">
                              <Link
                                to="/dashboard/season/$seasonId/games/$serieId"
                                search={{ women: dashboardData.women }}
                                params={{
                                  seasonId: seasonId,
                                  serieId: serie.serieId.toString(),
                                }}
                              >
                                <Button size="sm" variant="outline">
                                  Matcher
                                </Button>
                              </Link>
                              <Button
                                onClick={() => {
                                  setDashboard({
                                    ...dashboardData,
                                    seriesData: serie,
                                  })
                                  navigate({
                                    to: '/dashboard/season/$seasonId/newseries',
                                    params: { seasonId: seasonId },
                                    search: { women: dashboardData.women },
                                  })
                                }}
                                size="sm"
                                variant="outline"
                              >
                                Ändra
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col gap-2">
              <Card>
                <CardHeader>
                  <div className="flex flex-row justify-between items-center">
                    <CardTitle>Nya matcher</CardTitle>
                    <Button
                      onClick={() => {
                        setDashboard({
                          ...dashboardData,
                          seriesArray: season.series,
                          teamSeasonData: teamSeasonData,
                        })
                        navigate({
                          to: '/dashboard/season/$seasonId/bulkgames',
                          params: { seasonId: seasonId },
                          search: { women: dashboardData.women },
                        })
                      }}
                      size="sm"
                    >
                      Lägg till
                    </Button>
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex flex-row justify-between items-center">
                    <CardTitle>Metadata</CardTitle>
                    <Button
                      onClick={() => {
                        setDashboard({
                          ...dashboardData,
                          teamSeasonData: teamSeasonData,
                          metadataData: metadataObject,
                        })
                        navigate({
                          to: '/dashboard/season/$seasonId/metadata',
                          params: { seasonId: seasonId },
                          search: { women: dashboardData.women },
                        })
                      }}
                      size="sm"
                    >
                      Ändra metadata
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 text-sm">
                    <div></div>
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
                        <div>Kommentar:</div>{' '}
                        <div>{metadataObject?.comment}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

function OnErrorNavigate() {
  const { seasonId } = Route.useParams()
  const women = Route.useSearch({ select: (search) => search.women })
  return (
    <Navigate
      to="/dashboard/season/$seasonId/teamseason"
      params={{ seasonId: seasonId }}
      search={{ women: women }}
    />
  )
}
