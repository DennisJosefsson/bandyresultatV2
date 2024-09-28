import { Table, TableBody } from '@/components/ui/table'
import { compareResponseObject } from '@/lib/types/teams/compare'
import { compareFormState } from '@/lib/types/teams/teams'
import AllDataTableHeader from './AllDataTableHeader'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { z } from 'zod'
import DataTableRow from './DataTableRow'

type AllDataProps = {
  allData: z.infer<typeof compareResponseObject>['allData']
  sortedData: z.infer<typeof compareResponseObject>['sortedData']
  searchObject: z.infer<typeof compareFormState>
}

const AllData = ({ allData, sortedData, searchObject }: AllDataProps) => {
  if (!searchObject) return null

  if (searchObject.teamArray && searchObject.teamArray.length > 2) {
    return (
      <Card className="mb-2">
        <CardHeader className="p-2">
          <CardTitle className="text-[10px] md:text-sm">Sammanlagt</CardTitle>
        </CardHeader>
        <CardContent className="p-2 pt-0">
          <Table className="w-full table-fixed">
            <AllDataTableHeader />
            <TableBody>
              {sortedData.map((team, index) => {
                return <DataTableRow key={index} team={team} />
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  } else
    return (
      <Card className="mb-2">
        <CardHeader className="p-2">
          <CardTitle className="text-[10px] md:text-sm">Sammanlagt</CardTitle>
        </CardHeader>
        <CardContent className="p-2 pt-0">
          <Table className="w-full table-fixed">
            <AllDataTableHeader />
            <TableBody>
              {allData.slice(1).map((team, index) => {
                return <DataTableRow key={index} team={team} />
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
}

export default AllData
