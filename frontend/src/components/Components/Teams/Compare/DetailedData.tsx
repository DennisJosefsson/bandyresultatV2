import { compareResponseObject } from '@/lib/types/teams/compare'
import { groupConstant } from '@/lib/utils/constants'
import { filterOpposition } from '@/lib/utils/sortFunction'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody } from '@/components/ui/table'
import AllDataTableHeader from './AllDataTableHeader'

import DataTableRow from './DataTableRow'

import { compareFormState } from '@/lib/types/teams/teams'
import { z } from 'zod'
type DetailedDataProps = {
  categoryData: z.infer<typeof compareResponseObject>['categoryData']
  searchObject: z.infer<typeof compareFormState>
}

const DetailedData = ({ categoryData, searchObject }: DetailedDataProps) => {
  if (!searchObject) return null
  return (
    <div>
      {categoryData.map((category) => {
        return (
          <Card key={category.category} className="mb-2">
            <CardHeader className="p-2">
              <CardTitle className="text-[10px] md:text-sm">
                {groupConstant[category.category]}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0">
              <Table className="w-full table-fixed">
                <AllDataTableHeader />
                <TableBody>
                  {searchObject.teamArray &&
                    searchObject.teamArray.length > 2 &&
                    filterOpposition(category.teams).map((team, index) => {
                      return <DataTableRow key={index} team={team} />
                    })}
                  {searchObject.teamArray &&
                    searchObject.teamArray.length === 2 &&
                    category.teams.slice(1).map((team, index) => {
                      return <DataTableRow key={index} team={team} />
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default DetailedData
