import { SingleSeasonTableType } from '@/lib/types/tables/tables'
import { Link, useSearch } from '@tanstack/react-router'
import { Link as LinkIcon } from 'lucide-react'
import DataTable from './DataTable'
import { columns } from './columns'

type TableListProps = {
  tableArray: SingleSeasonTableType['tabeller']
  table: string
  seasonId: string
}

const TableList = ({ tableArray, seasonId, table }: TableListProps) => {
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
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
                <div
                  id={group.group}
                  className="flex flex-row gap-1 items-center mb-0.5 group"
                >
                  <h2 className="text-sm font-bold lg:text-base xl:text-xl">
                    Kvalgrupp
                  </h2>
                  <Link
                    from="/season/$seasonId/tables/$table"
                    params={{ seasonId: seasonId, table: table }}
                    hash={group.group}
                    search={{ women: women }}
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
                    params={{ seasonId: seasonId, table: table }}
                    hash={group.group}
                    search={{ women: women }}
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
