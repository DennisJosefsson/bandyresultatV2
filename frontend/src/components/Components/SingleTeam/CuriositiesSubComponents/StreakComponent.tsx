import Date from '@/components/Components/Common/Date'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { streakType } from '@/lib/types/teams/singleTeam'
import { ReactNode } from 'react'
import { z } from 'zod'

const StreakComponent = ({ children }: { children: ReactNode }) => {
  return <Card className="mb-2">{children}</Card>
}

function Title({ children }: { children: ReactNode }) {
  return (
    <CardHeader className="p-3">
      <CardTitle className="text-[10px] md:text-sm">{children}</CardTitle>
    </CardHeader>
  )
}

function Content({ streak }: { streak: z.infer<typeof streakType>[] }) {
  if (!streak || streak.length === 0) return null

  return (
    <CardContent className="text-[10px] xxs:text-xs lg:mr-0 lg:text-sm">
      <div>
        {streak.map((streak, index) => {
          return (
            <div
              key={`${streak.startDate}-${index}`}
              className="mb-1 flex flex-row justify-between rounded bg-muted-foreground/20 px-3 py-1"
            >
              <div>
                <Date>{streak.startDate}</Date> - <Date>{streak.endDate}</Date>
              </div>
              <div>{streak.gameCount} matcher</div>
            </div>
          )
        })}
      </div>
    </CardContent>
  )
}

StreakComponent.Title = Title
StreakComponent.Content = Content

export default StreakComponent
