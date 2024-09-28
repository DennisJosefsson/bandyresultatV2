import { TabsContent } from '@/components/ui/tabs'
import { compareResponseObject } from '@/lib/types/teams/compare'
import { compareFormState } from '@/lib/types/teams/teams'
import { z } from 'zod'
import FirstGames from './CompareStatsSubComponents/FirstGames'
import Golds from './CompareStatsSubComponents/Golds'
import LatestGames from './CompareStatsSubComponents/LatestGames'
import Playoffs from './CompareStatsSubComponents/Playoffs'
import Seasons from './CompareStatsSubComponents/Seasons'
type CompareStatsProps = {
  searchObject: z.infer<typeof compareFormState>
  firstGames: z.infer<typeof compareResponseObject>['firstGames']
  latestGames: z.infer<typeof compareResponseObject>['latestGames']
  golds: z.infer<typeof compareResponseObject>['golds']
  playoffs: z.infer<typeof compareResponseObject>['playoffs']
  allPlayoffs: z.infer<typeof compareResponseObject>['allPlayoffs']
  seasons: z.infer<typeof compareResponseObject>['seasons']
  allSeasons: z.infer<typeof compareResponseObject>['allSeasons']
}

const CompareStats = ({
  searchObject,
  firstGames,
  latestGames,
  golds,
  playoffs,
  allPlayoffs,
  seasons,
  allSeasons,
}: CompareStatsProps) => {
  if (!searchObject) return null
  return (
    <>
      <TabsContent value="games">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FirstGames firstGames={firstGames} searchObject={searchObject} />
          {latestGames.length > 0 && <LatestGames latestGames={latestGames} />}
        </div>
      </TabsContent>
      <TabsContent value="stats">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Seasons
            seasons={seasons}
            allSeasons={allSeasons}
            searchObject={searchObject}
          />
          <Playoffs
            playoffs={playoffs}
            allPlayoffs={allPlayoffs}
            searchObject={searchObject}
          />
          {golds.length > 0 && <Golds golds={golds} />}
        </div>
      </TabsContent>
    </>
  )
}

export default CompareStats
