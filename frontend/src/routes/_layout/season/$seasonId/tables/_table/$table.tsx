import Loading from '@/components/Components/Common/Loading'
import SeasonTablesButtonList from '@/components/Components/Season/SeasonTableComponents/SeasonTablesButtonList'
import StaticTables from '@/components/Components/Season/SeasonTableComponents/StaticTables'
import TableList from '@/components/Components/Season/SeasonTableComponents/TableList'
import { getSingleSeasonTable } from '@/lib/requests/tables'
import { createFileRoute, redirect, useLocation } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useEffect, useRef } from 'react'

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
  pendingComponent: () => <Loading page="seasonTable" />,
  loader: ({ deps, params }) =>
    getSingleSeasonTable({
      seasonId: params.seasonId,
      table: params.table,
      women: deps.women,
    }),

  errorComponent: ({ error, reset }) => (
    <ErrorComponent error={error} reset={reset} />
  ),
})

function Table() {
  const { seasonId, table } = Route.useParams()
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
          <TableList
            tableArray={tableArray}
            table={table}
            seasonId={seasonId}
          />
        )}
      </div>
    </div>
  )
}

function ErrorComponent({
  error,
  reset,
}: {
  error: unknown
  reset: () => void
}) {
  const pathname = useLocation({ select: (location) => location.pathname })
  const errorLocation = useRef(pathname)
  useEffect(() => {
    if (location.pathname !== errorLocation.current) {
      reset()
    }
  }, [pathname, reset])
  if (error && error instanceof AxiosError && error.response?.status === 404) {
    return <div>{error.response?.data.errors}</div>
  }

  return <div className="flex flex-row justify-center">Något gick fel.</div>
}
