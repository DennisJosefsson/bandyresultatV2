import Date from '@/components/Components/Common/Date'
import { Card } from '@/components/ui/card'
import { streak } from '@/lib/types/games/streaks'
import { z } from 'zod'
type StreakCardProps = {
  streak: z.infer<typeof streak>[]
  title: string
}

const StreakCard = ({ streak, title }: StreakCardProps) => {
  return (
    <div className="mt-2">
      <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
        {title}
      </h3>
      <div>
        {streak.map((streak) => {
          return (
            <Card
              className="mb-1 p-1 flex flex-row justify-between items-center text-[10px] md:text-sm md:mb-2 md:p-2"
              key={`${streak.name}-${streak.startDate}`}
            >
              <span className="mr-4 w-8 text-right text-base md:text-2xl font-bold tabular-nums">
                {streak.position}
              </span>
              <div className="flex flex-col flex-grow">
                <div className="flex flex-row justify-between">
                  <span className="truncate font-semibold">{streak.name}</span>
                </div>
                <div className="flex flex-row items-center justify-between text-[10px] md:text-xs">
                  <span className="w-48 sm:w-64">
                    <Date>{streak.startDate}</Date> -{' '}
                    <Date>{streak.endDate}</Date>
                  </span>
                </div>
              </div>
              <div>
                <span className="mr-4 w-8 text-right text-xs md:text-sm font-semibold tabular-nums">
                  {streak.gameCount}
                </span>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default StreakCard
