import { Card } from '@/components/ui/card'

type GeneralStatsCardProps = {
  pos: number
  name: string
  count: number
}

const GeneralStatsCard = ({ pos, name, count }: GeneralStatsCardProps) => {
  return (
    <Card className="mb-1 p-1 flex flex-row justify-between items-center text-[10px] md:text-sm md:mb-2 md:p-2">
      <span className="mr-4 w-8 text-right text-base md:text-2xl font-bold tabular-nums">
        {pos}
      </span>

      <div className="flex flex-row flex-grow justify-between">
        <span className="truncate font-semibold">{name}</span>
        <span className="text-right">{count}</span>
      </div>
    </Card>
  )
}

export default GeneralStatsCard
