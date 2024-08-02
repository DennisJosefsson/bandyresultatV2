import { useGetGameResultStats } from '@/lib/hooks/dataHooks/stats/useGetGameResultStats'
import { groupConstant } from '@/lib/utils/constants'
import { sortStatsCat } from '@/lib/utils/sortFunction'
import { useParams, useSearch } from '@tanstack/react-router'
import GameResultStatsCard from './GameResultStatsCard'

const GameCountStats = () => {
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId/stats' })
  const { women } = useSearch({ from: '/_layout' })
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
