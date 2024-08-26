import { useGamesSingleSeason } from '@/lib/hooks/dataHooks/games/useGamesSingleSeason'
import GamesList from './GamesList'

import { SortedGamesType } from '@/lib/utils/sortFunction'

type GameListObject = {
  [key: string]: SortedGamesType
}

type PlayedGamesProps = {
  playedGames: GameListObject
}

const PlayedGames = ({ playedGames }: PlayedGamesProps) => {
  const { seriesInfo } = useGamesSingleSeason()

  return (
    <div>
      <h1 className="text-sm font-bold md:text-base">Kommande</h1>
      <div className="w-full xl:px-2">
        {playedGames['playedFinalGames'].length > 0 && (
          <GamesList
            gamesArray={playedGames['playedFinalGames']}
            title={'Final'}
            seriesInfo={seriesInfo}
          />
        )}
        {playedGames['playedSemiGames'].length > 0 && (
          <GamesList
            gamesArray={playedGames['playedSemiGames']}
            title={'Semifinaler'}
            seriesInfo={seriesInfo}
          />
        )}
        {playedGames['playedQuarterGames'].length > 0 && (
          <GamesList
            gamesArray={playedGames['playedQuarterGames']}
            title={'Kvartsfinaler'}
            seriesInfo={seriesInfo}
          />
        )}
        {playedGames['playedEightGames'].length > 0 && (
          <GamesList
            gamesArray={playedGames['playedEightGames']}
            title={'Åttondelsfinaler'}
            seriesInfo={seriesInfo}
          />
        )}
        {playedGames['playedRegularGames'].length > 0 && (
          <GamesList
            gamesArray={playedGames['playedRegularGames']}
            title={'Grundseriematcher'}
            seriesInfo={seriesInfo}
          />
        )}

        {playedGames['playedQualificationGames'].length > 0 && (
          <GamesList
            gamesArray={playedGames['playedQualificationGames']}
            title={'Kvalmatcher'}
            seriesInfo={seriesInfo}
          />
        )}
      </div>
    </div>
  )
}

export default PlayedGames
