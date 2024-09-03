import { groupConstant } from '@/lib/utils/constants'
import { sortStatsCat } from '@/lib/utils/sortFunction'
import { useLoaderData } from '@tanstack/react-router'
import GameResultStatsCard from './GameResultStatsCard'

const GameCountStats = () => {
  const { gamesCountTotal, gamesCountTotalCat } = useLoaderData({
    from: '/_layout/season/$seasonId/stats',
  })

  return (
    <>
      {gamesCountTotal && (
        <div>
          <GameResultStatsCard title="Antal matcher" count={gamesCountTotal} />
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
