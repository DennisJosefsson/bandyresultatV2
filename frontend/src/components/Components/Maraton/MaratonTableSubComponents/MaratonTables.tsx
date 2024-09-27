import { maratonTable } from '@/lib/types/tables/tables'
import { z } from 'zod'
import { columns } from './columns'
import DataTable from './DataTable'

const MaratonTables = ({
  tabell,
}: {
  tabell: z.infer<typeof maratonTable>[]
}) => {
  const teamObject = tabell.reduce(
    (o, key) => ({ ...o, [key.team.casualName]: key.team }),
    {}
  )

  return (
    <div className="w-full">
      <DataTable columns={columns} data={tabell} teamObject={teamObject} />
    </div>
  )
}

export default MaratonTables
