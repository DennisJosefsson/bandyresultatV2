import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { useGetGameResultStats } from '@/lib/hooks/dataHooks/stats/useGetGameResultStats'
import GameResultStatsCard from './GameResultStatsCard'
import { sortStatsCat } from '@/lib/utils/sortFunction'
import { groupConstant } from '@/lib/utils/constants'
import { useParams } from '@tanstack/react-router'

const GameCountStats = () => {
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId/stats' })
  const { women } = useGenderContext()
  const { gamesCountTotal, gamesCountTotalCat } = useGetGameResultStats(
    seasonId,
    women
  )

  return (
    <>
      {gamesCountTotal && (
        <div>
          <GameResultStatsCard
            title="Antal matcher"
            count={gamesCountTotal.count}
          />
          {gamesCountTotalCat && gamesCountTotalCat.length > 0 ? (
            <>
              {sortStatsCat(gamesCountTotalCat).map((cat) => {
                return (
                  <GameResultStatsCard
                    key={`${cat.category}-${Math.random()}`}
                    title={groupConstant[cat.category]}
                    count={cat.count}
                  />
                )
              })}
            </>
          ) : null}
        </div>
      )}
    </>
  )
}

export default GameCountStats
