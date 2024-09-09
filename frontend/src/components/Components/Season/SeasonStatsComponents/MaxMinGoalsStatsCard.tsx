import Date from '@/components/Components/Common/Date'
type MaxMinGoalsType = {
  home_name: string
  away_name: string
  resultat: string
  datum: string
  sum_goals: number
}[]

type MaxMinGoalsStatsCardProps = {
  maxMinGoals: MaxMinGoalsType
  title: string
}

const MaxMinGoalsStatsCard = ({
  maxMinGoals,
  title,
}: MaxMinGoalsStatsCardProps) => {
  return (
    <div>
      <h6 className="text-xs sm:text-sm font-semibold">{title}</h6>

      <div>
        {maxMinGoals.map((game, index) => {
          return (
            <div
              key={`${index}-${Math.random()}`}
              className="flex flex-col mb-2 gap-1 p-2 bg-muted rounded-md"
            >
              <div className="flex flex-row justify-between">
                <div className="text-xs sm:text-sm">
                  {game.home_name}-{game.away_name}
                </div>
                <div className="text-xs sm:text-sm">{game.resultat}</div>
              </div>
              <div className="flex flex-row">
                <div className="text-xs sm:text-sm">
                  <Date>{game.datum}</Date>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MaxMinGoalsStatsCard
