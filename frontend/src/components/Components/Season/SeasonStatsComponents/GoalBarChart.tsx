import { useParams, useSearch } from '@tanstack/react-router'

import { useGetGoalStats } from '@/lib/hooks/dataHooks/stats/useGetGoalStats'
import BarChartCard from './BarChartCard'

const GoalBarChart = () => {
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId/stats' })
  const { women } = useSearch({ from: '/_layout' })
  const { averageArray, totObjectArray } = useGetGoalStats(seasonId, women)

  return (
    <>
      <BarChartCard
        averageArray={averageArray}
        totObjectArray={totObjectArray}
      />
    </>
  )
}

export default GoalBarChart
