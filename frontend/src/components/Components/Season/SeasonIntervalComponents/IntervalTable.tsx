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
import { cn } from '@/lib/utils/utils'
import { z } from 'zod'

type IntervalTableProps = {
  table: z.infer<typeof developmentTable>[]

  serie: z.infer<typeof serie>
}

const IntervalTable = ({ table, serie }: IntervalTableProps) => {
  const { favTeams } = useTeampreferenceContext()

  return (
    <div className="mx-2 xl:mt-7 lg:mt-5 text-[10px] lg:text-sm xl:text-base 2xl:text-lg xl:mx-0">
      <Table>
        <TableCaption>{serie.comment}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope="col" className="text-left text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
              P
            </TableHead>
            <TableHead scope="col" className="text-left text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
              Lag
            </TableHead>

            <TableHead
              scope="col"
              className="text-right text-[10px] lg:text-sm xl:text-base 2xl:text-lg"
            >
              M
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[10px] lg:text-sm xl:text-base 2xl:text-lg"
            >
              V
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[10px] lg:text-sm xl:text-base 2xl:text-lg"
            >
              O
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[10px] lg:text-sm xl:text-base 2xl:text-lg"
            >
              F
            </TableHead>
            <TableHead
              scope="col"
              className="hidden text-right text-[10px] md:table-cell lg:text-sm xl:text-base 2xl:text-lg"
            >
              GM
            </TableHead>
            <TableHead
              scope="col"
              className="hidden text-right text-[10px] md:table-cell lg:text-sm xl:text-base 2xl:text-lg"
            >
              IM
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[10px] lg:text-sm xl:text-base 2xl:text-lg"
            >
              MS
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[10px] lg:text-sm xl:text-base 2xl:text-lg"
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
                className={cn( serie.serieStructure?.includes(index + 1)
                  ? 'border-b-2 border-foreground'
                  : null, favTeams.includes(team.teamId) ? 'font-bold' : null)}
              >
                <TableCell className="text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
                  {index + 1}
                </TableCell>
                <TableCell className="truncate text-left text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
                  {team.casualName}
                </TableCell>

                <TableCell className="text-right tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
                  {team.table.games}
                </TableCell>
                <TableCell className="text-right tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
                  {team.table.wins}
                </TableCell>
                <TableCell className="text-right tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
                  {team.table.draws}
                </TableCell>
                <TableCell className="text-right tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
                  {team.table.lost}
                </TableCell>
                <TableCell className="hidden text-right tabular-nums text-[10px] md:table-cell lg:text-sm xl:text-base 2xl:text-lg">
                  {team.table.scoredGoals}
                </TableCell>
                <TableCell className="hidden text-right tabular-nums text-[10px] md:table-cell lg:text-sm xl:text-base 2xl:text-lg">
                  {team.table.concededGoals}
                </TableCell>
                <TableCell className="text-right tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
                  {team.table.scoredGoals - team.table.concededGoals}
                </TableCell>
                <TableCell className="text-right tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
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
