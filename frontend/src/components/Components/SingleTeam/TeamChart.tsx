import TeamBarChart from './TeamChartSubComponents/TeamBarChart'
import TeamLineChart from './TeamChartSubComponents/TeamLineChart'

const TeamChart = () => {
  return (
    <div className="flex flex-col gap-y-1 md:gap-y-2">
      <TeamBarChart />
      <TeamLineChart />
    </div>
  )
}

export default TeamChart
