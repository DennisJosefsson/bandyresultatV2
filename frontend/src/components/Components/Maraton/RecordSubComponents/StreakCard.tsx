import Date from '@/components/Components/Common/Date'
import { Card } from '@/components/ui/card'

type StreakCardProps = {
  streak: {
    name: string
    game_count: number
    start_date: string
    end_date: string
  }[]
  title: string
}

const StreakCard = ({ streak, title }: StreakCardProps) => {
  return (
    <div className="mt-2">
      <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
        {title}
      </h3>
      <div>
        {streak.map((streak, index) => {
          return (
            <Card
              className="mb-1 p-1 flex flex-row justify-between items-center text-[10px] md:text-sm md:mb-2 md:p-2"
              key={`${streak.name}-${Math.random()}`}
            >
              <span className="mr-4 w-8 text-right text-base md:text-2xl font-bold tabular-nums">
                {index + 1}
              </span>
              <div className="flex flex-col flex-grow">
                <div className="flex flex-row justify-between">
                  <span className="truncate font-semibold">{streak.name}</span>
                  <span className="text-right">{streak.game_count}</span>
                </div>
                <div className="flex flex-row items-center justify-between text-[10px] md:text-xs">
                  <span className="w-48 sm:w-64">
                    <Date>{streak.start_date}</Date> -{' '}
                    <Date>{streak.end_date}</Date>
                  </span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default StreakCard
