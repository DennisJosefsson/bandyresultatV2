import { staticGroupTable } from '@/lib/types/tables/seasonTable'
import { z } from 'zod'
import StaticTableList from './StaticTableList'

type StaticTableListProps = {
  tableArray: z.infer<typeof staticGroupTable>[]
}

const StaticTables = ({ tableArray }: StaticTableListProps) => {
  return (
    <div>
      {tableArray.map((tableObject) => {
        return (
          <StaticTableList key={tableObject.group} tableObject={tableObject} />
        )
      })}
    </div>
  )
}

export default StaticTables
