import { useGetGoalStats } from '@/lib/hooks/dataHooks/stats/useGetGoalStats'
import BarChartCard from './BarChartCard'

const GoalBarChart = () => {
  const { averageArray, totObjectArray } = useGetGoalStats()

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
