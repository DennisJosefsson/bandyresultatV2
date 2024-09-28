import { staticGroupTable } from '@/lib/types/tables/tables'
import { z } from 'zod'
import DataTable from './StaticDataTable'
import { columns } from './staticColumns'

type StaticTableListProps = {
  tableObject: z.infer<typeof staticGroupTable> | undefined
}

const StaticTableList = ({ tableObject }: StaticTableListProps) => {
  if (tableObject === undefined) return null
  const teamObject = tableObject.tables.reduce(
    (o, key) => ({ ...o, [key.team.name]: key.teamId }),
    {}
  )

  return (
    <div className="my-6">
      <div className="mb-6">
        <h2 className="text-sm font-bold lg:text-base xl:text-xl">
          {tableObject.name}
        </h2>

        <div>
          <DataTable
            columns={columns}
            data={tableObject.tables}
            serieStructure={tableObject.serieStructure}
            teamObject={teamObject}
          />
          {tableObject.comment != null && (
            <p className="bg-background p-1 text-xs font-bold">
              {tableObject.comment}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default StaticTableList
