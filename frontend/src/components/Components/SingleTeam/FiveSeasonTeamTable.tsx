import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody } from '@/components/ui/table'
import { fiveSeason } from '@/lib/types/teams/singleTeam'
import { z } from 'zod'
import TeamTableHeader from './TableComponents/TableHeader'
import TeamTableRow from './TableComponents/TeamTableDataRow'

type FiveSeasonTeamTableProps = z.infer<typeof fiveSeason>['tables']

const FiveSeasonTeamTable = ({
  tables,
  season = '',
}: {
  tables: FiveSeasonTeamTableProps
  season?: string
}) => {
  return (
    <div className="mb-6">
      {tables.map((table, index) => {
        return (
          <Card key={table.group} className="mb-2 sm:mb-4 md:mb-6 p-1 md:p-2">
            <CardHeader className="p-1 md:p-2">
              <CardTitle className="text-[10px] md:text-sm">
                {`${table.serie.serieName} ${season}`}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-1 md:p-2">
              <Table className="w-full table-fixed">
                <TeamTableHeader />
                <TableBody>
                  <TeamTableRow table={table} key={index} />
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default FiveSeasonTeamTable
