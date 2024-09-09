import { CompareResponseObjectType } from '@/lib/types/teams/compare'

import Date from '@/components/Components/Common/Date'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CompareFormState } from '@/lib/types/teams/teams'

type FirstGamesProps = {
  firstGames: CompareResponseObjectType['firstGames']
  searchObject: CompareFormState
}

const FirstGames = ({ firstGames, searchObject }: FirstGamesProps) => {
  const janFirstGames = searchObject['women']
    ? 'Speldatum 1 januari från säsongerna 1988/1989 och 1989/1990 gäller enbart tillsvidare, de betyder att faktiskt datum saknas.'
    : 'Obs! Speldatum 1 januari före 1931 gäller enbart tillsvidare, de betyder att faktiskt datum saknas.'

  return (
    <Card className="mt-2 w-full">
      <CardHeader className="p-2">
        <CardTitle className="text-[10px] md:text-sm">
          Första matcherna
        </CardTitle>
      </CardHeader>
      <CardContent className="  w-full text-[8px] sm:text-sm p-1 pt-0">
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
        <CardFooter>{janFirstGames}</CardFooter>
      </CardContent>
    </Card>
  )
}

export default FirstGames
