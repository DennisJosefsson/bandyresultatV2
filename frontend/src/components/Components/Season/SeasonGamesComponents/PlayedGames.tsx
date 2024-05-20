import { Dispatch, SetStateAction } from 'react'
import { useSingleSeasonGames } from '@/lib/hooks/dataHooks/games/useSingleSeasonGames'
import GamesList from './GamesList'

import { useGamesSeason } from '@/lib/hooks/dataHooks/games/useGamesSeason'
import { useGamesSingleSeason } from '@/lib/hooks/dataHooks/games/useGamesSingleSeason'
import { useParams } from '@tanstack/react-router'

type PlayedGamesProps = {
  teamFilter: string
  setShowAddGameModal: Dispatch<SetStateAction<boolean>>
}

const PlayedGames = ({ teamFilter, setShowAddGameModal }: PlayedGamesProps) => {
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId/games' })
  const {
    playedEightGames,
    playedQualificationGames,
    playedFinalGames,
    playedSemiGames,
    playedQuarterGames,
    playedRegularGames,
  } = useSingleSeasonGames(seasonId, teamFilter)

  const { seriesInfo } = useGamesSingleSeason(seasonId)

  const { startSeason, endSeason } = useGamesSeason()
  return (
    <div>
      <h1 className="text-[1rem] font-bold md:text-[1.25rem]">Spelade</h1>
      <div className="w-full px-2 xl:px-0">
        {playedFinalGames.length > 0 && (
          <GamesList
            gamesArray={playedFinalGames}
            title={'Final'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}
        {playedSemiGames.length > 0 && (
          <GamesList
            gamesArray={playedSemiGames}
            title={'Semifinaler'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}
        {playedQuarterGames.length > 0 && (
          <GamesList
            gamesArray={playedQuarterGames}
            title={'Kvartsfinaler'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}
        {playedEightGames.length > 0 && (
          <GamesList
            gamesArray={playedEightGames}
            title={'Åttondelsfinaler'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}
        {playedRegularGames.length > 0 && (
          <GamesList
            gamesArray={playedRegularGames}
            title={'Grundseriematcher'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}

        {playedQualificationGames.length > 0 && (
          <GamesList
            gamesArray={playedQualificationGames}
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

export default PlayedGames
