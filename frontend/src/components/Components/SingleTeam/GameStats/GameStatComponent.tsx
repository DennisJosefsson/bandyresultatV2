import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { gameStat } from '@/lib/types/teams/singleTeam'
import { ReactNode } from 'react'
import { z } from 'zod'
import Date from '../../Common/Date'

const GameStatComponent = ({ children }: { children: ReactNode }) => {
  return <Card className="mb-2">{children}</Card>
}

function Title({ children }: { children: ReactNode }) {
  return (
    <CardHeader className="p-3">
      <CardTitle className="text-[10px] md:text-sm">{children}</CardTitle>
    </CardHeader>
  )
}

function Content({ statArray }: { statArray: z.infer<typeof gameStat>[] }) {
  if (!statArray || statArray.length === 0) return null

  return (
    <CardContent className="text-[10px] xxs:text-xs lg:mr-0 lg:text-sm">
      <div>
        {statArray.map((stat, index) => {
          return (
            <div
              key={`${stat.gameId}-${index}`}
              className="flex flex-col gap-1"
            >
              <div className="mb-1 flex flex-row justify-between rounded bg-muted-foreground/20 px-1 md:px-3 py-1">
                <div className="flex flex-row gap-2">
                  <div className="w-24 xxs:w-32">
                    <Date>{stat.date}</Date>
                  </div>
                  <span className="w-24 lg:w-32">
                    {stat.homeTeam}-{stat.awayTeam}
                  </span>
                </div>
                <div>
                  <span className="w-16">{stat.result}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </CardContent>
  )
}

GameStatComponent.Title = Title
GameStatComponent.Content = Content

export default GameStatComponent
