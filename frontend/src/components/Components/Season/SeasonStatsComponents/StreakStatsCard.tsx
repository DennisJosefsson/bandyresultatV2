import Date from '@/components/Components/Common/Date'
type StreakType = {
  team: number
  casual_name: string
  game_count: number
  start_date: string
  end_date: string
}[]

type StreakStatsCard = {
  streak: StreakType
  title: string
}

const StreakStatsCard = ({ streak, title }: StreakStatsCard) => {
  return (
    <div>
      <h6 className="text-xs sm:text-sm font-semibold">{title}</h6>

      {streak?.map((team, index) => {
        return (
          <div
            key={`${team.casual_name}-${team.game_count}-${
              team.start_date
            }-${Math.random()}-${index}`}
            className="flex flex-col mb-2 gap-1 p-2 bg-muted rounded-md"
          >
            <div className="flex flex-row justify-between">
              <div className="text-xs sm:text-sm">{team.casual_name}</div>
              <div className="text-xs sm:text-sm">{team.game_count}</div>
            </div>
            <div className="flex flex-row">
              <div className="text-xs sm:text-sm">
                <Date>{team.start_date}</Date> - <Date>{team.end_date}</Date>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StreakStatsCard
