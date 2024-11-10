import { TableCell, TableRow } from '@/components/ui/table'
import { useMediaQuery } from 'usehooks-ts'

interface TableRowData {
  team: {
    shortName: string
    casualName: string
  }
  opponent?: {
    shortName: string
    casualName: string
  }
  totalGames: number
  totalWins: number
  totalDraws: number
  totalLost: number
  totalGoalsScored: number
  totalGoalsConceded: number
  totalGoalDifference: number
  totalPoints: number
}

const DataTableRow = ({ team }: { team: TableRowData }) => {
  const matches = useMediaQuery('(min-width: 640px)')
  return (
    <TableRow>
      <TableCell className="px-1 py-1 text-left text-[10px] md:py-2 lg:text-sm">
        {team.opponent && (
          <>
            {!matches
              ? `${team.team.shortName}-${team.opponent.shortName}`
              : `${team.team.casualName}-${team.opponent.casualName}`}
          </>
        )}
        {!team.opponent && (
          <>{!matches ? team.team.shortName : team.team.casualName}</>
        )}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm">
        {team.totalGames}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm">
        {team.totalWins}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm">
        {team.totalDraws}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm">
        {team.totalLost}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right tabular-nums xs:table-cell text-[10px] md:py-2 lg:text-sm">
        {team.totalGoalsScored}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right tabular-nums xs:table-cell text-[10px] md:py-2 lg:text-sm">
        {team.totalGoalsConceded}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right tabular-nums xs:table-cell text-[10px] md:py-2 lg:text-sm">
        {team.totalGoalDifference}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm">
        {team.totalPoints}
      </TableCell>
    </TableRow>
  )
}

export default DataTableRow
