import { TabsContent } from '@/components/ui/tabs'
import {
  compareFormState,
  compareResponseObject,
} from '@/lib/types/teams/compare'
import { z } from 'zod'
import FirstGames from './CompareStatsSubComponents/FirstGames'
import Golds from './CompareStatsSubComponents/Golds'
import LatestGames from './CompareStatsSubComponents/LatestGames'
import LatestWins from './CompareStatsSubComponents/LatestWins'
import Playoffs from './CompareStatsSubComponents/Playoffs'
import Seasons from './CompareStatsSubComponents/Seasons'
type CompareStatsProps = {
  searchObject: z.infer<typeof compareFormState>
  firstGames: z.infer<typeof compareResponseObject>['firstGames']
  latestGames: z.infer<typeof compareResponseObject>['latestGames']
  golds: z.infer<typeof compareResponseObject>['golds']
  playoffs: z.infer<typeof compareResponseObject>['playoffs']
  allPlayoffs: z.infer<typeof compareResponseObject>['allPlayoffs']
  firstDivisionSeasonsSince1931: z.infer<
    typeof compareResponseObject
  >['firstDivisionSeasonsSince1931']
  firstDivisionSeasons: z.infer<
    typeof compareResponseObject
  >['firstDivisionSeasons']
  allDbSeasons: z.infer<typeof compareResponseObject>['allDbSeasons']
  latestHomeWin: z.infer<typeof compareResponseObject>['latestHomeWin']
  latestAwayWin: z.infer<typeof compareResponseObject>['latestAwayWin']
}

const CompareStats = ({
  searchObject,
  firstGames,
  latestGames,
  golds,
  playoffs,
  allPlayoffs,
  firstDivisionSeasonsSince1931,
  firstDivisionSeasons,
  allDbSeasons,
  latestHomeWin,
  latestAwayWin,
}: CompareStatsProps) => {
  if (!searchObject) return null
  return (
    <>
      <TabsContent value="games">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <LatestWins latestWins={latestHomeWin} title="Senaste hemmavinsten" />
          <LatestWins latestWins={latestAwayWin} title="Senaste bortavinsten" />
          <FirstGames firstGames={firstGames} searchObject={searchObject} />
          {latestGames.length > 0 && <LatestGames latestGames={latestGames} />}
        </div>
      </TabsContent>
      <TabsContent value="stats">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Seasons
            firstDivisionSeasonsSince1931={firstDivisionSeasonsSince1931}
            firstDivisionSeasons={firstDivisionSeasons}
            allDbSeasons={allDbSeasons}
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
