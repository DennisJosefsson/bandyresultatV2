import { singleTeam } from '@/lib/types/teams/singleTeam'
import { z } from 'zod'
import TeamBarChart from './TeamChartSubComponents/TeamBarChart'
import TeamLineChart from './TeamChartSubComponents/TeamLineChart'

const TeamChart = ({ team }: { team: z.infer<typeof singleTeam> }) => {
  return (
    <div className="flex flex-col gap-y-1 md:gap-y-2">
      <TeamBarChart barChartData={team.barChartData} />
      <TeamLineChart
        chartDataLength={team.chartDataLength}
        renderData={team.renderData}
      />
    </div>
  )
}

export default TeamChart
