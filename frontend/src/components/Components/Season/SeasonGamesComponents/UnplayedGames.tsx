import { useGamesSingleSeason } from '@/lib/hooks/dataHooks/games/useGamesSingleSeason'
import GamesList from './GamesList'

import { SortedGamesType } from '@/lib/utils/sortFunction'

type GameListObject = {
  [key: string]: SortedGamesType
}

type UnplayedGamesProps = {
  unplayedGames: GameListObject
}

const UnplayedGames = ({ unplayedGames }: UnplayedGamesProps) => {
  const { seriesInfo } = useGamesSingleSeason()

  return (
    <div>
      <h1 className="text-sm font-bold md:text-base">Kommande</h1>
      <div className="w-full xl:px-2">
        {unplayedGames['unplayedFinalGames'].length > 0 && (
          <GamesList
            gamesArray={unplayedGames['unplayedFinalGames']}
            title={'Final'}
            seriesInfo={seriesInfo}
          />
        )}
        {unplayedGames['unplayedSemiGames'].length > 0 && (
          <GamesList
            gamesArray={unplayedGames['unplayedSemiGames']}
            title={'Semifinaler'}
            seriesInfo={seriesInfo}
          />
        )}
        {unplayedGames['unplayedQuarterGames'].length > 0 && (
          <GamesList
            gamesArray={unplayedGames['unplayedQuarterGames']}
            title={'Kvartsfinaler'}
            seriesInfo={seriesInfo}
          />
        )}
        {unplayedGames['unplayedEightGames'].length > 0 && (
          <GamesList
            gamesArray={unplayedGames['unplayedEightGames']}
            title={'Åttondelsfinaler'}
            seriesInfo={seriesInfo}
          />
        )}
        {unplayedGames['unplayedRegularGames'].length > 0 && (
          <GamesList
            gamesArray={unplayedGames['unplayedRegularGames']}
            title={'Grundseriematcher'}
            seriesInfo={seriesInfo}
          />
        )}

        {unplayedGames['unplayedQualificationGames'].length > 0 && (
          <GamesList
            gamesArray={unplayedGames['unplayedQualificationGames']}
            title={'Kvalmatcher'}
            seriesInfo={seriesInfo}
          />
        )}
      </div>
    </div>
  )
}

export default UnplayedGames
