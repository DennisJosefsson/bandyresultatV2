import { CompareResponseObjectType } from '@/lib/types/teams/compare'
import { CompareFormState } from '@/lib/types/teams/teams'
import AllDataTableHeader from './AllDataTableHeader'
import { Table, TableBody } from '@/components/ui/table'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import DataTableRow from './DataTableRow'

type AllDataProps = {
  allData: CompareResponseObjectType['allData']
  sortedData: CompareResponseObjectType['sortedData']
  searchObject: CompareFormState
}

const AllData = ({ allData, sortedData, searchObject }: AllDataProps) => {
  if (!searchObject) return null

  if (searchObject.teamArray.length > 2) {
    return (
      <Card className="mb-2">
        <CardHeader>
          <CardTitle className="text-xs md:text-sm">Sammanlagt</CardTitle>
        </CardHeader>
        <CardContent>
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
        <CardHeader>
          <CardTitle className="text-xs md:text-sm">Sammanlagt</CardTitle>
        </CardHeader>
        <CardContent>
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
