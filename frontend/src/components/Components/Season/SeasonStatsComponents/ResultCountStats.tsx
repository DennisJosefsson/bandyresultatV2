import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { useGetGameResultStats } from '@/lib/hooks/dataHooks/stats/useGetGameResultStats'

import PieChartCard from './PieChartCard'
import { useParams } from '@tanstack/react-router'

const ResultCountStats = () => {
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId/stats' })
  const { women } = useGenderContext()
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
