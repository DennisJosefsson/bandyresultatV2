import { useGetGameResultStats } from '@/lib/hooks/dataHooks/stats/useGetGameResultStats'

import { useParams, useSearch } from '@tanstack/react-router'
import PieChartCard from './PieChartCard'

const ResultCountStats = () => {
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId/stats' })
  const { women } = useSearch({ from: '/_layout' })
  const { pieChartData } = useGetGameResultStats(seasonId, women)

  return (
    <>
      <div>
        <PieChartCard data={pieChartData} />
      </div>
    </>
  )
}

export default ResultCountStats
