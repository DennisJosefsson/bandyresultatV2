import { CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TeamChart from './TeamChart'
import TeamCuriosities from './TeamCuriosities'
import TeamFiveSeasonsTables from './TeamFiveSeasons'
import TeamHeader from './TeamHeader'
import TeamTable from './TeamTable'

const Team = () => {
  return (
    <div className="mt-2 flex min-h-screen flex-col font-inter text-foreground">
      <TeamHeader />
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
            <TeamTable />
          </TabsContent>
          <TabsContent value="fiveSeasons">
            <TeamFiveSeasonsTables />
          </TabsContent>
          <TabsContent value="stats">
            <TeamCuriosities />
          </TabsContent>
          <TabsContent value="chart">
            <TeamChart />
          </TabsContent>
        </Tabs>
      </CardContent>
    </div>
  )
}

export default Team
