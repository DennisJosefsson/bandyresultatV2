import { CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLoaderData, useParams } from '@tanstack/react-router'
import TeamChart from './TeamChart'
import TeamCuriosities from './TeamCuriosities'
import TeamFiveSeasonsTables from './TeamFiveSeasons'
import TeamHeader from './TeamHeader'
import TeamTable from './TeamTable'

const Team = () => {
  const teamId = useParams({
    from: '/_layout/team/$teamId',
    select: (params) => params.teamId,
  })
  const team = useLoaderData({
    from: '/_layout/team/$teamId',
  })

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
                {team.tabeller.length > 0 ? (
                  <>
                    <TeamTable tabeller={team.tabeller} />
                  </>
                ) : (
                  <>
                    <div className="flex flex-row justify-center mt-4">
                      <h2 className="text-xs font-bold md:text-sm">
                        Tyvärr saknas tabelldata för detta lag.
                      </h2>
                    </div>
                  </>
                )}
              </TabsContent>
              <TabsContent value="fiveSeasons">
                {team.sortedFiveSeasons.length > 0 ? (
                  <>
                    <TeamFiveSeasonsTables
                      tableArray={team.sortedFiveSeasons}
                    />
                  </>
                ) : (
                  <>
                    <div className="flex flex-row justify-center mt-4">
                      <h2 className="text-xs font-bold md:text-sm">
                        Tyvärr saknas tabelldata för detta lag.
                      </h2>
                    </div>
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

export default Team
