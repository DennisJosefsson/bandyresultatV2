import { useGetGoalStats } from '@/lib/hooks/dataHooks/stats/useGetGoalStats'
import { useParams, useSearch } from '@tanstack/react-router'
import GoalStatsCard from './GoalStatsCard'

const TotalGoalStats = () => {
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId/stats' })
  const { women } = useSearch({ from: '/_layout' })
  const {
    goalsScoredTotal,
    goalsScoredTotalCat,
    goalsScoredHomeTotal,
    goalsScoredHomeTotalCat,
    goalsScoredAwayTotal,
    goalsScoredAwayTotalCat,
  } = useGetGoalStats(seasonId, women)

  return (
    <>
      {goalsScoredTotal && goalsScoredTotalCat ? (
        <GoalStatsCard
          title="Antal mål"
          base={goalsScoredTotal}
          catArray={goalsScoredTotalCat}
        />
      ) : null}
      {goalsScoredHomeTotal && goalsScoredHomeTotalCat ? (
        <GoalStatsCard
          title="Antal mål hemmalag"
          base={goalsScoredHomeTotal}
          catArray={goalsScoredHomeTotalCat}
        />
      ) : null}
      {goalsScoredAwayTotal && goalsScoredAwayTotalCat ? (
        <GoalStatsCard
          title="Antal mål bortalag"
          base={goalsScoredAwayTotal}
          catArray={goalsScoredAwayTotalCat}
        />
      ) : null}
    </>
  )
}

export default TotalGoalStats
