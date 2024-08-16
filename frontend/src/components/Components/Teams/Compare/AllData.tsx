import { Table, TableBody } from '@/components/ui/table'
import { CompareResponseObjectType } from '@/lib/types/teams/compare'
import { CompareFormState } from '@/lib/types/teams/teams'
import AllDataTableHeader from './AllDataTableHeader'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import DataTableRow from './DataTableRow'

type AllDataProps = {
  allData: CompareResponseObjectType['allData']
  sortedData: CompareResponseObjectType['sortedData']
  searchObject: CompareFormState
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
