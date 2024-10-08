import { staticGroupTable } from '@/lib/types/tables/seasonTable'
import { z } from 'zod'
import LowerDivisionLink from './LowerDivisionLink'
import StaticTableList from './StaticTableList'

type StaticTableListProps = {
  tableArray: z.infer<typeof staticGroupTable>[]
}

const StaticTables = ({ tableArray }: StaticTableListProps) => {
  return (
    <div>
      <LowerDivisionLink />

      <div>
        {tableArray.map((tableObject) => {
          return (
            <StaticTableList
              key={tableObject.group}
              tableObject={tableObject}
            />
          )
        })}
      </div>
    </div>
  )
}

export default StaticTables
