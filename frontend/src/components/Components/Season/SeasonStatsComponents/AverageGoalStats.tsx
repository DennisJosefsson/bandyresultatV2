import { useLoaderData } from '@tanstack/react-router'
import GoalStatsCard from './GoalStatsCard'

const AverageGoalStats = () => {
  const {
    goalsScoredAverage,
    goalsScoredAverageCat,
    goalsScoredHomeAverage,
    goalsScoredHomeAverageCat,
    goalsScoredAwayAverage,
    goalsScoredAwayAverageCat,
  } = useLoaderData({
    from: '/_layout/season/$seasonId/stats',
  })

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
