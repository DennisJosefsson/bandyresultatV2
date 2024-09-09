import { SingleSeasonTableType } from '@/lib/types/tables/tables'
import { Link } from '@tanstack/react-router'
import { Link as LinkIcon } from 'lucide-react'
import DataTable from './DataTable'
import { columns } from './columns'

type TableListProps = {
  tableArray: SingleSeasonTableType['tabeller']
  table: 'all' | 'away' | 'home'
  seasonId: number
}

const TableList = ({ tableArray, table }: TableListProps) => {
  if (tableArray.length === 0) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-foreground md:text-base">
        <p className="mx-10 text-center">
          Serietabeller saknas för denna säsong.
        </p>
      </div>
    )
  }
  return (
    <div className="mb-6">
      {tableArray.map((group) => {
        const teamObject = group.tables.reduce(
          (o, key) => ({ ...o, [key.lag.casualName]: key.team }),
          {}
        )

        return (
          <div key={group.group} className="mb-6">
            {group.group.includes('Kval') &&
            tableArray.filter((item) => item.group.includes('Kval')).length ===
              1 ? (
              <>
                <div
                  id={group.group}
                  className="flex flex-row gap-1 items-center mb-0.5 group"
                >
                  <h2 className="text-sm font-bold lg:text-base xl:text-xl">
                    Kvalgrupp
                  </h2>
                  <Link
                    from="/season/$seasonId/tables/$table"
                    params={(prev) => ({ ...prev, table: table })}
                    hash={group.group}
                    search={(prev) => ({ ...prev })}
                  >
                    <LinkIcon className="hidden h-4 w-4 text-muted-foreground group-hover:block" />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div
                  id={group.group}
                  className="flex flex-row gap-1 items-center mb-0.5 group"
                >
                  <h2 className="text-sm font-bold lg:text-base xl:text-xl">
                    {group.name}
                  </h2>
                  <Link
                    from="/season/$seasonId/tables/$table"
                    params={(prev) => ({ ...prev, table: table })}
                    hash={group.group}
                    search={(prev) => ({ ...prev })}
                  >
                    <LinkIcon className="hidden h-4 w-4 text-muted-foreground group-hover:block" />
                  </Link>
                </div>
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
