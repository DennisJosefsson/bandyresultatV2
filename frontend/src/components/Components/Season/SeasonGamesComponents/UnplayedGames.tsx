import { useGamesSingleSeason } from '@/lib/hooks/dataHooks/games/useGamesSingleSeason'
import { useSingleSeasonGames } from '@/lib/hooks/dataHooks/games/useSingleSeasonGames'
import GamesList from './GamesList'

const UnplayedGames = () => {
  const {
    unplayedEightGames,
    unplayedQualificationGames,
    unplayedFinalGames,
    unplayedSemiGames,
    unplayedQuarterGames,
    unplayedRegularGames,
  } = useSingleSeasonGames()

  const { seriesInfo } = useGamesSingleSeason()

  return (
    <div>
      <h1 className="text-sm font-bold md:text-base">Kommande</h1>
      <div className="w-full xl:px-2">
        {unplayedFinalGames.length > 0 && (
          <GamesList
            gamesArray={unplayedFinalGames}
            title={'Final'}
            seriesInfo={seriesInfo}
          />
        )}
        {unplayedSemiGames.length > 0 && (
          <GamesList
            gamesArray={unplayedSemiGames}
            title={'Semifinaler'}
            seriesInfo={seriesInfo}
          />
        )}
        {unplayedQuarterGames.length > 0 && (
          <GamesList
            gamesArray={unplayedQuarterGames}
            title={'Kvartsfinaler'}
            seriesInfo={seriesInfo}
          />
        )}
        {unplayedEightGames.length > 0 && (
          <GamesList
            gamesArray={unplayedEightGames}
            title={'Åttondelsfinaler'}
            seriesInfo={seriesInfo}
          />
        )}
        {unplayedRegularGames.length > 0 && (
          <GamesList
            gamesArray={unplayedRegularGames}
            title={'Grundseriematcher'}
            seriesInfo={seriesInfo}
          />
        )}

        {unplayedQualificationGames.length > 0 && (
          <GamesList
            gamesArray={unplayedQualificationGames}
            title={'Kvalmatcher'}
            seriesInfo={seriesInfo}
          />
        )}
      </div>
    </div>
  )
}

export default UnplayedGames
