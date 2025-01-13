import { Card } from '@/components/ui/card'

type MaxMinGoalsCardProps = {
  pos: number
  teams: string
  result: string
  date: string
}

const MaxMinGoalsCard = ({
  pos,
  teams,
  result,
  date,
}: MaxMinGoalsCardProps) => {
  return (
    <Card className="mb-1 p-1 flex flex-row justify-between items-center text-[10px] md:text-sm md:mb-2 md:p-2">
      <span className="w-8 mr-4 text-base font-bold text-right md:text-2xl tabular-nums">
        {pos}
      </span>
      <div className="flex flex-col flex-grow">
        <div className="flex flex-row justify-between">
          <span className="font-semibold truncate">
            {teams}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between text-[10px] md:text-xs">
          <span className="w-48 sm:w-64">{date}</span>
        </div>
      </div>
      <div>
        <span className="w-8 mr-4 text-xs font-semibold text-right md:text-sm tabular-nums">
          {result}
        </span>
      </div>
    </Card>
  )
}

export default MaxMinGoalsCard
