import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CompareResponseObjectType } from '@/lib/types/teams/compare'

import Date from '@/components/Components/Common/Date'

type LatestGamesProps = {
  latestGames: CompareResponseObjectType['latestGames']
}

const LatestGames = ({ latestGames }: LatestGamesProps) => {
  return (
    <Card className="mt-2 w-full">
      <CardHeader className="p-2">
        <CardTitle className="text-[10px] md:text-sm">
          Senaste matcherna
        </CardTitle>
      </CardHeader>
      <CardContent className="compareFirstLast mb-3 w-full text-[8px] sm:text-sm p-2 pt-0">
        <div>
          {latestGames.map((game) => {
            return (
              <div key={game.game_id} className="card">
                <div className="line1">
                  <Date>{game.date}</Date>
                </div>
                <div className="line2">
                  <div>
                    {game.home_name}-{game.away_name}
                  </div>
                  <div className="result">{game.result}</div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default LatestGames
