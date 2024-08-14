import { useMediaQuery } from 'usehooks-ts'
import AverageGoalStats from './AverageGoalStats'
import GoalBarChart from './GoalBarChart'
import TotalGoalStats from './TotalGoalStats'

const GoalStats = () => {
  const matches = useMediaQuery('(min-width: 1000px)')
  return (
    <div>
      <h4 className="text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
        Målstatistik
      </h4>
      {matches ? (
        <div>
          <GoalBarChart />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3">
            <TotalGoalStats />
          </div>
          <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3">
            <AverageGoalStats />
          </div>
        </div>
      )}
    </div>
  )
}

export default GoalStats
