import { useParams } from '@tanstack/react-router'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'

import { useGetGoalStats } from '@/lib/hooks/dataHooks/stats/useGetGoalStats'
import BarChartCard from './BarChartCard'

const AverageGoalStats = () => {
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId/stats' })
  const { women } = useGenderContext()
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

export default AverageGoalStats
