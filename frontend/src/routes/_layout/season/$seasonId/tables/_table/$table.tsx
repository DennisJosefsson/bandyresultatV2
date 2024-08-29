import Loading from '@/components/Components/Common/Loading'
import SeasonTablesButtonList from '@/components/Components/Season/SeasonTableComponents/SeasonTablesButtonList'
import StaticTables from '@/components/Components/Season/SeasonTableComponents/StaticTables'
import TableList from '@/components/Components/Season/SeasonTableComponents/TableList'
import { getSingleSeasonTable } from '@/lib/requests/tables'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/season/$seasonId/tables/_table/$table'
)({
  loaderDeps: ({ search: { women } }) => ({
    women,
  }),
  beforeLoad: ({ search, params }) => {
    if (
      search.women &&
      ['1973', '1974'].includes(params.seasonId) &&
      params.table !== 'all'
    ) {
      throw redirect({
        to: '/season/$seasonId/tables/$table',
        params: { table: 'all', seasonId: params.seasonId },
        search: { women: search.women },
      })
    }
  },
  component: Table,
  pendingComponent: Loading,
  loader: ({ deps, params }) =>
    getSingleSeasonTable({
      seasonId: params.seasonId,
      table: params.table,
      women: deps.women,
    }),
})

function Table() {
  const { seasonId } = Route.useParams()
  const women = Route.useSearch({ select: (search) => search.women })
  const tableArray = Route.useLoaderData({
    select: (search) => search.tabeller,
  })
  const staticTableArray = Route.useLoaderData({
    select: (search) => search.staticTables,
  })

  return (
    <div>
      <SeasonTablesButtonList />
      <div>
        {women && ['1973', '1974'].includes(seasonId) ? (
          <StaticTables tableArray={staticTableArray} />
        ) : (
          <TableList tableArray={tableArray} />
        )}
      </div>
    </div>
  )
}
