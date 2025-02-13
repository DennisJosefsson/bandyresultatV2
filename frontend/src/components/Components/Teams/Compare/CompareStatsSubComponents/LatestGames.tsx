import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { compareResponseObject } from '@/lib/types/teams/compare'

import Date from '@/components/Components/Common/Date'
import { z } from 'zod'

type LatestGamesProps = {
  latestGames: z.infer<typeof compareResponseObject>['latestGames']
}

const LatestGames = ({ latestGames }: LatestGamesProps) => {
  return (
    <Card className="mt-2 w-full">
      <CardHeader className="p-2">
        <CardTitle className="text-[10px] md:text-sm xl:text-base 2xl:text-lg">
          Senaste matcherna
        </CardTitle>
      </CardHeader>
      <CardContent className="mb-3 w-full text-xs xl:text-sm 2xl:text-base p-1 pt-0">
        <div>
          {latestGames.map((game) => {
            return (
              <div
                key={game.game_id}
                className="my-2 flex w-full flex-col rounded bg-muted-foreground/20 px-3 py-1"
              >
                <div className="mb-0.5 font-semibold">
                  <Date>{game.date}</Date>
                </div>
                <div className="flex flex-row justify-between">
                  <div>
                    {game.home_name}-{game.away_name}
                  </div>
                  <div className="tabular-nums">{game.result}</div>
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
