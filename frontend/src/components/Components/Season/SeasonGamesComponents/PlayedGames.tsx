import { useGamesSingleSeason } from '@/lib/hooks/dataHooks/games/useGamesSingleSeason'
import { useSingleSeasonGames } from '@/lib/hooks/dataHooks/games/useSingleSeasonGames'
import GamesList from './GamesList'

const PlayedGames = () => {
  const {
    playedEightGames,
    playedQualificationGames,
    playedFinalGames,
    playedSemiGames,
    playedQuarterGames,
    playedRegularGames,
  } = useSingleSeasonGames()

  const { seriesInfo } = useGamesSingleSeason()

  return (
    <div>
      <h1 className="text-sm font-bold md:text-base">Spelade</h1>
      <div className="w-full xl:px-2">
        {playedFinalGames.length > 0 && (
          <GamesList
            gamesArray={playedFinalGames}
            title={'Final'}
            seriesInfo={seriesInfo}
          />
        )}
        {playedSemiGames.length > 0 && (
          <GamesList
            gamesArray={playedSemiGames}
            title={'Semifinaler'}
            seriesInfo={seriesInfo}
          />
        )}
        {playedQuarterGames.length > 0 && (
          <GamesList
            gamesArray={playedQuarterGames}
            title={'Kvartsfinaler'}
            seriesInfo={seriesInfo}
          />
        )}
        {playedEightGames.length > 0 && (
          <GamesList
            gamesArray={playedEightGames}
            title={'Åttondelsfinaler'}
            seriesInfo={seriesInfo}
          />
        )}
        {playedRegularGames.length > 0 && (
          <GamesList
            gamesArray={playedRegularGames}
            title={'Grundseriematcher'}
            seriesInfo={seriesInfo}
          />
        )}

        {playedQualificationGames.length > 0 && (
          <GamesList
            gamesArray={playedQualificationGames}
            title={'Kvalmatcher'}
            seriesInfo={seriesInfo}
          />
        )}
      </div>
    </div>
  )
}

export default PlayedGames
