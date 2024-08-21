import Loading from '@/components/Components/Common/Loading'
import TeamChart from '@/components/Components/SingleTeam/TeamChart'
import TeamCuriosities from '@/components/Components/SingleTeam/TeamCuriosities'
import TeamFiveSeasonsTables from '@/components/Components/SingleTeam/TeamFiveSeasons'
import TeamHeader from '@/components/Components/SingleTeam/TeamHeader'
import TeamTable from '@/components/Components/SingleTeam/TeamTable'
import { CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetSingleTeam } from '@/lib/hooks/dataHooks/teams/useGetSingleTeam'
import { teamQueries } from '@/lib/queries/teams/queries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/team/$teamId')({
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(
      teamQueries['singleTeam'](params.teamId)
    )
  },
  component: Team,
  pendingComponent: () => <Loading page="singleTeam" />,
})

function Team() {
  const { teamId } = Route.useParams()
  const { data: team } = useGetSingleTeam(teamId)
  return (
    <>
      {team && (
        <div className="mt-2 flex min-h-screen flex-col font-inter text-foreground">
          <TeamHeader team={team} teamId={parseInt(teamId)} />
          <CardContent className="p-1 md:p-6">
            <Tabs defaultValue="tables">
              <TabsList>
                <TabsTrigger
                  className="text-[10px] md:text-sm truncate"
                  value="tables"
                >
                  Tabeller
                </TabsTrigger>
                <TabsTrigger
                  className="text-[10px] md:text-sm truncate"
                  value="fiveSeasons"
                >
                  Senaste säsongerna
                </TabsTrigger>
                <TabsTrigger
                  className="text-[10px] md:text-sm truncate"
                  value="stats"
                >
                  Statistik
                </TabsTrigger>
                <TabsTrigger
                  className="text-[10px] md:text-sm truncate"
                  value="chart"
                >
                  Diagram
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tables">
                {team.tabeller.length === 0 && (
                  <h2 className="mb-2 ml-0 text-base font-bold md:text-xl">
                    Tyvärr saknas tabelldata
                  </h2>
                )}
                {team.tabeller.length > 0 && (
                  <>
                    <TeamTable tabeller={team.tabeller} />
                  </>
                )}
              </TabsContent>
              <TabsContent value="fiveSeasons">
                {team.sortedFiveSeasons.length > 1 && (
                  <>
                    <TeamFiveSeasonsTables
                      tableArray={team.sortedFiveSeasons}
                    />
                  </>
                )}
              </TabsContent>
              <TabsContent value="stats">
                <TeamCuriosities team={team} />
              </TabsContent>
              <TabsContent value="chart">
                <TeamChart chartData={team.chartData} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </div>
      )}
    </>
  )
}
