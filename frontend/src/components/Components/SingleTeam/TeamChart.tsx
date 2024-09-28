import { singleTeam } from '@/lib/types/teams/teams'
import { z } from 'zod'
import TeamBarChart from './TeamChartSubComponents/TeamBarChart'
import TeamLineChart from './TeamChartSubComponents/TeamLineChart'

const TeamChart = ({
  chartData,
}: {
  chartData: z.infer<typeof singleTeam>['chartData']
}) => {
  return (
    <div className="flex flex-col gap-y-1 md:gap-y-2">
      <TeamBarChart chartData={chartData} />
      <TeamLineChart chartData={chartData} />
    </div>
  )
}

export default TeamChart
