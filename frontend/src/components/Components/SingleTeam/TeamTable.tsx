import { SingleTeamTable } from '@/lib/types/tables/tables'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody } from '@/components/ui/table'
import { groupConstant, sortOrder } from '@/lib/utils/constants'
import TeamTableHeader from './TableComponents/TableHeader'
import TeamTableRow from './TableComponents/TeamTableDataRow'

type TeamTableProps = SingleTeamTable

const TeamTable = ({
  tabeller,
  season = '',
}: {
  tabeller: TeamTableProps[]
  season?: string
}) => {
  const sortedTables = tabeller.sort((a, b) => {
    if (sortOrder.indexOf(a.category) > sortOrder.indexOf(b.category)) {
      return 1
    }
    if (sortOrder.indexOf(a.category) < sortOrder.indexOf(b.category)) {
      return -1
    } else {
      return 0
    }
  })
  return (
    <div className="mb-6">
      {sortedTables.map((category, index) => {
        return (
          <Card
            key={category.category}
            className="mb-2 sm:mb-4 md:mb-6 p-1 md:p-6"
          >
            <CardHeader className="p-1 md:p-6">
              <CardTitle className="text-[10px] md:text-sm">
                {`${groupConstant[category.category]} ${season}`}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-1 md:p-6">
              <Table className="w-full table-fixed">
                <TeamTableHeader />
                <TableBody>
                  <TeamTableRow category={category} key={index} />
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
