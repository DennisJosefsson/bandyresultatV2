import { useLoaderData } from '@tanstack/react-router'
import GoalStatsCard from './GoalStatsCard'

const TotalGoalStats = () => {
  const {
    goalsScoredTotal,
    goalsScoredTotalCat,
    goalsScoredHomeTotal,
    goalsScoredHomeTotalCat,
    goalsScoredAwayTotal,
    goalsScoredAwayTotalCat,
  } = useLoaderData({
    from: '/_layout/season/$seasonId/stats',
  })

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
