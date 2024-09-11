import { Card } from '@/components/ui/card'

type PointsGoalsCardProps = {
  pos: number
  name: string
  data: number
  year: string
}

const PointsGoalsCard = ({ pos, name, data, year }: PointsGoalsCardProps) => {
  return (
    <Card className="mb-1 p-1 flex flex-row justify-between items-center text-[10px] md:text-sm md:mb-2 md:p-2">
      <span className="mr-4 w-8 text-right text-base md:text-2xl font-bold tabular-nums">
        {pos}
      </span>
      <div className="flex flex-col flex-grow">
        <div className="flex flex-row justify-between">
          <span className="truncate font-semibold">{name}</span>
        </div>
        <div className="flex flex-row items-center justify-between text-[10px] md:text-xs">
          <span className="w-48 sm:w-64">{year}</span>
        </div>
      </div>
      <div>
        <span className="mr-4 w-8 text-right text-xs md:text-sm font-semibold tabular-nums">
          {data}
        </span>
      </div>
    </Card>
  )
}

export default PointsGoalsCard
