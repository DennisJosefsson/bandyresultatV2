import Loading from '@/components/Components/Common/Loading'
import MaratonTables from '@/components/Components/Maraton/MaratonTableSubComponents/MaratonTables'
import { maratonTabell } from '@/lib/requests/tables'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

type MaratonQueryType = 'all' | 'home' | 'away'

export const Route = createFileRoute('/_layout/maraton/table/$table')({
  params: {
    parse: (params) => ({
      table: z.enum(['all', 'away', 'home']).catch('all').parse(params.table),
    }),
    stringify: ({ table }) => ({ table: `${table}` }),
  },
  component: MaratonTable,
  pendingComponent: () => <Loading page="maraton" />,
  loader: ({ params }) => maratonTabell(params.table as MaratonQueryType),
})

function MaratonTable() {
  const women = Route.useSearch({ select: (search) => search.women })
  const data = Route.useLoaderData()
  const tabell = data.filter((tabell) => tabell.women === women)

  return (
    <div>
      <MaratonTables tabell={tabell} />
    </div>
  )
}
