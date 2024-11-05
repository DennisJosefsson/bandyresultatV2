import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useTeampreferenceContext from '@/lib/hooks/contextHooks/useTeampreferenceContext'
import { developmentTable } from '@/lib/types/games/development'
import { serie } from '@/lib/types/series/series'
import { z } from 'zod'

type IntervalTableProps = {
  table: z.infer<typeof developmentTable>[]

  serie: z.infer<typeof serie>
}

const IntervalTable = ({ table, serie }: IntervalTableProps) => {
  const { favTeams } = useTeampreferenceContext()

  return (
    <div className="mx-2 xl:mt-7 lg:mt-5 text-[8px] sm:text-[10px] lg:text-sm xl:mx-0">
      <Table>
        <TableCaption>{serie.comment}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead
              scope="col"
              className="text-left text-[8px] sm:text-[10px] lg:text-sm"
            >
              P
            </TableHead>
            <TableHead
              scope="col"
              className="text-left text-[8px] sm:text-[10px] lg:text-sm"
            >
              Lag
            </TableHead>

            <TableHead
              scope="col"
              className="text-right text-[8px] sm:text-[10px] lg:text-sm"
            >
              M
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[8px] sm:text-[10px] lg:text-sm"
            >
              V
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[8px] sm:text-[10px] lg:text-sm"
            >
              O
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[8px] sm:text-[10px] lg:text-sm"
            >
              F
            </TableHead>
            <TableHead
              scope="col"
              className="hidden text-right text-[8px] sm:text-[10px] md:table-cell lg:text-sm"
            >
              GM
            </TableHead>
            <TableHead
              scope="col"
              className="hidden text-right text-[8px] sm:text-[10px] md:table-cell lg:text-sm"
            >
              IM
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[8px] sm:text-[10px] lg:text-sm"
            >
              MS
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[8px] sm:text-[10px] lg:text-sm"
            >
              P
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.map((team, index) => {
            return (
              <TableRow
                key={`${team.teamId}-${index}`}
                className={`${
                  serie.serieStructure?.includes(index + 1)
                    ? 'border-b-2 border-foreground'
                    : null
                } ${favTeams.includes(team.teamId) ? 'font-bold' : null}`}
              >
                <TableCell className="text-[8px] sm:text-[10px] lg:text-sm">
                  {index + 1}
                </TableCell>
                <TableCell className="truncate text-left text-[8px] sm:text-[10px] lg:text-sm">
                  {team.casualName}
                </TableCell>

                <TableCell className="text-right text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
                  {team.table.games}
                </TableCell>
                <TableCell className="text-right text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
                  {team.table.wins}
                </TableCell>
                <TableCell className="text-right text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
                  {team.table.draws}
                </TableCell>
                <TableCell className="text-right text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
                  {team.table.lost}
                </TableCell>
                <TableCell className="hidden text-right text-[8px] tabular-nums sm:text-[10px] md:table-cell lg:text-sm">
                  {team.table.scoredGoals}
                </TableCell>
                <TableCell className="hidden text-right text-[8px] tabular-nums sm:text-[10px] md:table-cell lg:text-sm">
                  {team.table.concededGoals}
                </TableCell>
                <TableCell className="text-right text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
                  {team.table.scoredGoals - team.table.concededGoals}
                </TableCell>
                <TableCell className="text-right text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
                  {team.table.points}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default IntervalTable
