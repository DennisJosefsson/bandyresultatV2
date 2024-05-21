import { useParams } from '@tanstack/react-router'
import GoalStatsCard from './GoalStatsCard'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { useGetGoalStats } from '@/lib/hooks/dataHooks/stats/useGetGoalStats'

const TotalGoalStats = () => {
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId/stats' })
  const { women } = useGenderContext()
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
