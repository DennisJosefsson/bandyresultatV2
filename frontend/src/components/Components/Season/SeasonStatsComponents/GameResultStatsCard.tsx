const GameResultStatsCard = ({
  title,
  count,
}: {
  title: string
  count: number | string | undefined
}) => {
  return (
    <div className="flex flex-row justify-between mb-1 bg-muted rounded-md p-2">
      <div className="text-xs sm:text-sm">{title}</div>
      <div className="text-xs sm:text-sm">{count}</div>
    </div>
  )
}

export default GameResultStatsCard
