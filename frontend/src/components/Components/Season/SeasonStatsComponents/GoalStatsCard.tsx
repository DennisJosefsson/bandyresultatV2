import { groupConstant } from '@/lib/utils/constants'
import { sortStatsCat } from '@/lib/utils/sortFunction'

type BaseType = {
  data: number
  season: {
    year: string
    seasonId: number
  }
}
type CatArrayType = {
  data: number
  category: string
  season: {
    seasonId: number
    year: string
  }
}[]

type GoalStatsCardProps = {
  title: string
  base: BaseType
  catArray: CatArrayType
}

const GoalStatsCard = ({ title, base, catArray }: GoalStatsCardProps) => {
  return (
    <div>
      <div className="flex flex-row justify-between mb-1 bg-muted rounded-md p-2">
        <div className="text-xs sm:text-sm">{title}: </div>
        <div className="text-xs sm:text-sm">{base.data}</div>
      </div>

      {sortStatsCat(catArray).map((cat) => {
        return (
          <div
            key={`${cat.category}-${Math.random()}`}
            className="flex flex-row justify-between mb-1 bg-muted rounded-md p-2"
          >
            <div className="text-xs sm:text-sm">
              {groupConstant[cat.category]}
            </div>
            <div className="text-xs sm:text-sm">{cat.data}</div>
          </div>
        )
      })}
    </div>
  )
}

export default GoalStatsCard
