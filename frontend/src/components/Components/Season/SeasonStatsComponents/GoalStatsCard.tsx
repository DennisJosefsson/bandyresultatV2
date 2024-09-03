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
      <div className="statsCard">
        <div className="name">{title}: </div>
        <div className="count">{base.data}</div>
      </div>

      {sortStatsCat(catArray).map((cat) => {
        return (
          <div key={`${cat.category}-${Math.random()}`} className="statsCard">
            <div className="name">{groupConstant[cat.category]}</div>
            <div className="count">{cat.data}</div>
          </div>
        )
      })}
    </div>
  )
}

export default GoalStatsCard
