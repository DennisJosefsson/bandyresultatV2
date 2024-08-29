import { StaticGroupTable } from '@/lib/types/tables/tables'
import StaticTableList from './StaticTableList'

type StaticTableListProps = {
  tableArray: StaticGroupTable[]
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
