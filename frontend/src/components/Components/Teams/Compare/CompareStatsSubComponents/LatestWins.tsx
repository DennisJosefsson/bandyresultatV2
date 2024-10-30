import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { latestWin } from '@/lib/types/teams/compare'

import Date from '@/components/Components/Common/Date'
import { z } from 'zod'

type LatestWinsProps = {
  latestWins: z.infer<typeof latestWin>
  title: string
}

const LatestWins = ({ latestWins, title }: LatestWinsProps) => {
  if (latestWins.length === 0) return null
  return (
    <Card className="mt-2 w-full">
      <CardHeader className="p-2">
        <CardTitle className="text-[10px] md:text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="mb-3 w-full text-[8px] sm:text-xs xl:text-sm p-2 pt-0">
        <div>
          {latestWins.map((game) => {
            return (
              <div
                key={game.gameId}
                className="my-2 flex w-full flex-col rounded bg-muted-foreground/20 px-3 py-1"
              >
                <div className="mb-0.5 font-semibold">
                  <Date>{game.date}</Date>
                </div>
                <div className="flex flex-row justify-between">
                  <div>
                    {game.homeName}-{game.awayName}
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

export default LatestWins
