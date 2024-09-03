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
    <div className="streakCard">
      <h6 className="head">{title}</h6>

      <div>
        {maxDiff.map((game, index) => {
          return (
            <div key={`${index}-${Math.random()}`}>
              <div className="streak1st">
                <div className="name">
                  {game.home_name}-{game.away_name}
                </div>
                <div className="count">{game.resultat}</div>
              </div>
              <div className="streak2nd">
                <div className="dates">
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
