import { groupTable } from '@/lib/types/tables/seasonTable'
import { z } from 'zod'
import { columns } from './columns'
import DataTable from './DataTable'

type SubTableListProps = {
  tableArray: z.infer<typeof groupTable>[]
}

const SubTableList = ({ tableArray }: SubTableListProps) => {
  return (
    <div className="mb-6 mt-2">
      {tableArray.map((group) => {
        const teamObject = group.tables.reduce(
          (o, key) => ({ ...o, [key.team.casualName]: key.teamId }),
          {}
        )

        return (
          <div key={group.group} className="mb-6">
            <div
              id={group.group}
              className="flex flex-row gap-1 items-center mb-0.5 group"
            >
              <h2 className="text-sm font-bold lg:text-base xl:text-xl tracking-wide">
                {group.name}
              </h2>
            </div>

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

export default SubTableList
