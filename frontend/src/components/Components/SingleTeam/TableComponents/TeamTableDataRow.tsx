import { TableCell, TableRow } from '@/components/ui/table'

type Table = {
  totalGames: number
  totalWins: number
  totalDraws: number
  totalLost: number
  totalGoalsScored: number
  totalGoalsConceded: number
  totalGoalDifference: number
  totalPoints: number
}

const TeamTableRow = ({ table }: { table: Table }) => {
  return (
    <TableRow>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm">
        {table.totalGames}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm">
        {table.totalWins}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm">
        {table.totalDraws}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm">
        {table.totalLost}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right tabular-nums xs:table-cell text-[10px] md:py-2 lg:text-sm">
        {table.totalGoalsScored}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right tabular-nums xs:table-cell text-[10px] md:py-2 lg:text-sm">
        {table.totalGoalsConceded}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right tabular-nums xs:table-cell text-[10px] md:py-2 lg:text-sm">
        {table.totalGoalDifference}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm">
        {table.totalPoints}
      </TableCell>
    </TableRow>
  )
}

export default TeamTableRow
