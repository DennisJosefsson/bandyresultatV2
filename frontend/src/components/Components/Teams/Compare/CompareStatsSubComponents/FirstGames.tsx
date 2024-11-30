import {
  compareFormState,
  compareResponseObject,
} from '@/lib/types/teams/compare'

import Date from '@/components/Components/Common/Date'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { z } from 'zod'

type FirstGamesProps = {
  firstGames: z.infer<typeof compareResponseObject>['firstGames']
  searchObject: z.infer<typeof compareFormState>
}

const FirstGames = ({ firstGames }: FirstGamesProps) => {
  return (
    <Card className="mt-2 w-full">
      <CardHeader className="p-2">
        <CardTitle className="text-[10px] md:text-sm xl:text-base 2xl:text-lg">
          Första matcherna
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full text-xs xl:text-sm 2xl:text-base p-1 pt-0">
        <div className="mb-2">
          {firstGames.map((game) => {
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

export default FirstGames
