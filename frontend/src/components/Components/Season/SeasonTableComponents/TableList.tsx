import { SingleSeasonTableType } from '@/lib/types/tables/tables'
import DataTable from './DataTable'
import { columns } from './columns'

type TableListProps = {
  tableArray: SingleSeasonTableType['tabeller']
}

const TableList = ({ tableArray }: TableListProps) => {
  return (
    <div className="mb-6">
      {tableArray.map((group) => {
        const teamObject = group.tables.reduce(
          (o, key) => ({ ...o, [key.lag.casualName]: key.team }),
          {}
        )

        return (
          <div key={group.group} className="mb-6">
            {group.group.includes('Kval') && tableArray.length === 1 ? (
              <>
                <h2 className="text-sm font-bold lg:text-base xl:text-xl">
                  Kvalgrupp
                </h2>
              </>
            ) : (
              <>
                <h2 className="text-sm font-bold lg:text-base xl:text-xl">
                  {group.name}
                </h2>
              </>
            )}
            <div>
              <DataTable
                columns={columns}
                data={group.tables}
                teamObject={teamObject}
                serieStructure={group.serieStructure}
              />
              {group.comment && (
                <p className="bg-background p-1 text-[8px] md:text-xs">
                  {group.comment}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TableList
