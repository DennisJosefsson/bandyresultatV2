import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody } from '@/components/ui/table'
import { singleTeam } from '@/lib/types/teams/singleTeam'
import { groupConstant } from '@/lib/utils/constants'
import { z } from 'zod'
import TeamTableHeader from './TableComponents/TableHeader'
import TeamTableRow from './TableComponents/TeamTableDataRow'

type TeamTableProps = z.infer<typeof singleTeam>['tables']

const TeamTable = ({
  tables,
  season = '',
}: {
  tables: TeamTableProps
  season?: string
}) => {
  return (
    <div className="mb-6">
      {tables.map((category, index) => {
        return (
          <Card
            key={category.category}
            className="mb-2 sm:mb-4 md:mb-6 p-1 md:p-2"
          >
            <CardHeader className="p-1 md:p-2">
              <CardTitle className="text-[10px] md:text-sm">
                {`${groupConstant[category.category]} ${season}`}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-1 md:p-2">
              <Table className="w-full table-fixed">
                <TeamTableHeader />
                <TableBody>
                  <TeamTableRow table={category} key={index} />
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default TeamTable
