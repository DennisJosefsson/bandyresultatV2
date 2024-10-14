import Loading from '@/components/Components/Common/Loading'
import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
import StaticTableList from '@/components/Components/Season/SeasonTableComponents/StaticTableList'
import SubTableList from '@/components/Components/Season/SeasonTableComponents/SubTableList'
import { getSingleSeasonSubTable } from '@/lib/requests/tables'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/season/$seasonId/tables/sub/$group'
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ params, deps }) => {
    const tables = await getSingleSeasonSubTable({
      seasonId: params.seasonId,
      women: deps.women,
      group: params.group,
    })

    if (
      typeof tables === 'object' &&
      'errors' in tables &&
      tables.errors === 'Inga tabeller'
    ) {
      throw notFound()
    }

    return tables
  },
  pendingComponent: Loading,
  component: SubTables,
  notFoundComponent: NotFound,
})

function SubTables() {
  const tables = Route.useLoaderData()

  if (tables.staticTables) {
    return (
      <div>
        <Link
          from={Route.fullPath}
          to="/season/$seasonId/tables/$table"
          params={(prev) => ({ seasonId: prev.seasonId, table: 'all' })}
          search={(prev) => ({ ...prev })}
        >
          Högsta divisionen
        </Link>
        {tables.staticTables.map((tableObject) => {
          return (
            <StaticTableList
              key={tableObject.group}
              tableObject={tableObject}
            />
          )
        })}
      </div>
    )
  }

  if (tables.tables) {
    return <SubTableList tableArray={tables.tables} />
  }
}

function NotFound() {
  const women = Route.useSearch({ select: (s) => s.women })
  const seasonId = Route.useParams({ select: (params) => params.seasonId })

  if (women && seasonId < 1973) {
    return <NoWomenSeason />
  }

  return (
    <div className="mt-2 flex flex-row justify-center">
      <p>Tabell saknas fortfarande för aktuell grupp.</p>
    </div>
  )
}
