import { useGetGoalStats } from '@/lib/hooks/dataHooks/stats/useGetGoalStats'
import { useParams, useSearch } from '@tanstack/react-router'
import GoalStatsCard from './GoalStatsCard'

const AverageGoalStats = () => {
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId/stats' })
  const { women } = useSearch({ from: '/_layout' })
  const {
    goalsScoredAverage,
    goalsScoredAverageCat,
    goalsScoredHomeAverage,
    goalsScoredHomeAverageCat,
    goalsScoredAwayAverage,
    goalsScoredAwayAverageCat,
  } = useGetGoalStats(seasonId, women)

  return (
    <>
      {goalsScoredAverage && goalsScoredAverageCat ? (
        <GoalStatsCard
          title="Genomsnitt mål"
          base={goalsScoredAverage}
          catArray={goalsScoredAverageCat}
        />
      ) : null}
      {goalsScoredHomeAverage && goalsScoredHomeAverageCat ? (
        <GoalStatsCard
          title="Genomsnitt mål hemmalag"
          base={goalsScoredHomeAverage}
          catArray={goalsScoredHomeAverageCat}
        />
      ) : null}
      {goalsScoredAwayAverage && goalsScoredAwayAverageCat ? (
        <GoalStatsCard
          title="Genomsnitt mål bortalag"
          base={goalsScoredAwayAverage}
          catArray={goalsScoredAwayAverageCat}
        />
      ) : null}
    </>
  )
}

export default AverageGoalStats
