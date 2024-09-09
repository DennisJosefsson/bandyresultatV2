import Date from '@/components/Components/Common/Date'

type MaxDiffType = {
  home_name: string
  away_name: string
  resultat: string
  datum: string
  goal_difference: number
}[]

type MaxDiffStatsCardProps = {
  maxDiff: MaxDiffType
  title: string
}

const MaxDiffStatsCard = ({ maxDiff, title }: MaxDiffStatsCardProps) => {
  return (
    <div>
      <h6 className="text-xs sm:text-sm font-semibold">{title}</h6>

      <div>
        {maxDiff.map((game, index) => {
          return (
            <div
              key={`${index}-${Math.random()}`}
              className="flex flex-col mb-2 gap-1  p-2 bg-muted rounded-md"
            >
              <div className="flex flex-row justify-between">
                <div className="text-xs sm:text-sm">
                  {game.home_name}-{game.away_name}
                </div>
                <div className="text-xs sm:text-sm">{game.resultat}</div>
              </div>
              <div className="streak2nd">
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

export default MaxDiffStatsCard
