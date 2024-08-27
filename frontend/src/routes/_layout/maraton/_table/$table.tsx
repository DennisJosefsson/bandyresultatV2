import Loading from '@/components/Components/Common/Loading'
import MaratonTableHeader from '@/components/Components/Maraton/MaratonTableSubComponents/MaratonTableHeader'
import MaratonTables from '@/components/Components/Maraton/MaratonTableSubComponents/MaratonTables'
import { maratonTabell } from '@/lib/requests/tables'
import { createFileRoute } from '@tanstack/react-router'

type MaratonQueryType = 'all' | 'home' | 'away'

export const Route = createFileRoute('/_layout/maraton/_table/$table')({
  component: MaratonTable,
  pendingComponent: Loading,
  loader: ({ params }) => maratonTabell(params.table as MaratonQueryType),
})

function MaratonTable() {
  const women = Route.useSearch({ select: (search) => search.women })
  const data = Route.useLoaderData()
  const tabell = data.filter((tabell) => tabell.women === women)

  return (
    <div>
      <MaratonTableHeader />
      <div>
        <MaratonTables tabell={tabell} />
      </div>
    </div>
  )
}
