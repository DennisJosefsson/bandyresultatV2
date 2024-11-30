import {
  SmallArrowDownRight,
  SmallArrowUpRight,
} from '@/components/Components/Common/Icons/icons'
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
import { developmentDates } from '@/lib/types/games/development'
import { serie } from '@/lib/types/series/series'
import { z } from 'zod'

type AnimationTableProps = {
  dateArray: z.infer<typeof developmentDates>
  round: number
  serie: z.infer<typeof serie>
}

const AnimationTable = ({ dateArray, round, serie }: AnimationTableProps) => {
  const { favTeams } = useTeampreferenceContext()
  const displayArrow = (teamId: number) => {
    const prevPosObject = dateArray[round - 1].table.find(
      (team) => team.teamId === teamId
    )
    const currPosObject = dateArray[round].table.find(
      (team) => team.teamId === teamId
    )

    if (
      !prevPosObject ||
      !currPosObject ||
      !prevPosObject.table ||
      !currPosObject.table
    ) {
      throw new Error('Missing position objects')
    }
    const prevPos = prevPosObject.table.position
    const currPos = currPosObject.table.position

    if (prevPos === currPos) {
      return ''
    } else if (prevPos < currPos) {
      return <SmallArrowDownRight />
    } else if (prevPos > currPos) {
      return <SmallArrowUpRight />
    }
  }

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
            <TableHead className="hidden xs:table-cell"></TableHead>
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
          {dateArray[round]?.table.map((team, index) => {
            return (
              <TableRow
                key={`${team.teamId}-${index}`}
                className={`${
                  serie.serieStructure?.includes(index + 1)
                    ? 'border-b-2 border-foreground'
                    : null
                } ${favTeams.includes(team.teamId) ? 'font-bold' : null}`}
              >
                <TableCell className="text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
                  {team.table.position}
                </TableCell>
                <TableCell className="truncate text-left text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
                  {team.casualName}
                </TableCell>
                <TableCell className="hidden xs:table-cell text-[8px] text-slate-100 sm:text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
                  {round > 0 &&
                    team.table.games > 0 &&
                    displayArrow(team.teamId)}
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

export default AnimationTable
