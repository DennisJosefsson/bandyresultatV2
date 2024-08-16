import { useSingleSeasonGames } from '@/lib/hooks/dataHooks/games/useSingleSeasonGames'
import { Dispatch, SetStateAction } from 'react'
import GamesList from './GamesList'

import { useGamesSeason } from '@/lib/hooks/dataHooks/games/useGamesSeason'
import { useGamesSingleSeason } from '@/lib/hooks/dataHooks/games/useGamesSingleSeason'
import { useParams } from '@tanstack/react-router'

type UnplayedGamesProps = {
  teamFilter: string
  setShowAddGameModal: Dispatch<SetStateAction<boolean>>
}

const UnplayedGames = ({
  teamFilter,
  setShowAddGameModal,
}: UnplayedGamesProps) => {
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId/games' })
  const {
    unplayedEightGames,
    unplayedQualificationGames,
    unplayedFinalGames,
    unplayedSemiGames,
    unplayedQuarterGames,
    unplayedRegularGames,
  } = useSingleSeasonGames(seasonId, teamFilter)

  const { seriesInfo } = useGamesSingleSeason(seasonId)

  const { startSeason, endSeason } = useGamesSeason()
  return (
    <div>
      <h1 className="text-sm font-bold md:text-base">Kommande</h1>
      <div className="w-full xl:px-2">
        {unplayedFinalGames.length > 0 && (
          <GamesList
            gamesArray={unplayedFinalGames}
            title={'Final'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}
        {unplayedSemiGames.length > 0 && (
          <GamesList
            gamesArray={unplayedSemiGames}
            title={'Semifinaler'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}
        {unplayedQuarterGames.length > 0 && (
          <GamesList
            gamesArray={unplayedQuarterGames}
            title={'Kvartsfinaler'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}
        {unplayedEightGames.length > 0 && (
          <GamesList
            gamesArray={unplayedEightGames}
            title={'Åttondelsfinaler'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}
        {unplayedRegularGames.length > 0 && (
          <GamesList
            gamesArray={unplayedRegularGames}
            title={'Grundseriematcher'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}

        {unplayedQualificationGames.length > 0 && (
          <GamesList
            gamesArray={unplayedQualificationGames}
            title={'Kvalmatcher'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}
      </div>
    </div>
  )
}

export default UnplayedGames
