import { useGetGameResultStats } from '@/lib/hooks/dataHooks/stats/useGetGameResultStats'

import PieChartCard from './PieChartCard'

const ResultCountStats = () => {
  const { pieChartData } = useGetGameResultStats()

  return (
    <>
      <div>
        <PieChartCard data={pieChartData} />
      </div>
    </>
  )
}

export default ResultCountStats
