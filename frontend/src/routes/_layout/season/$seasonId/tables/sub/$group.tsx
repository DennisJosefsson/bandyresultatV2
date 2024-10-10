import Loading from '@/components/Components/Common/Loading'
import StaticTableList from '@/components/Components/Season/SeasonTableComponents/StaticTableList'
import { getSingleSeasonSubTable } from '@/lib/requests/tables'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/season/$seasonId/tables/sub/$group'
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: ({ params, deps }) =>
    getSingleSeasonSubTable({
      seasonId: params.seasonId,
      women: deps.women,
      group: params.group,
    }),
  pendingComponent: Loading,
  component: SubTables,
})

function SubTables() {
  const tableArray = Route.useLoaderData()

  if (tableArray.length === 0) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-[10px] font-bold text-foreground md:text-base">
        <p className="mx-10 text-center">
          Serietabeller för lägre divisioner saknas för denna säsong. Gå till{' '}
          <Link
            from={Route.fullPath}
            to="/season/$seasonId/tables/$table"
            params={(prev) => ({ seasonId: prev.seasonId, table: 'all' })}
            search={(prev) => ({ ...prev })}
            className="underline"
          >
            högsta divisionen
          </Link>
          .
        </p>
      </div>
    )
  }
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
      {tableArray.map((tableObject) => {
        return (
          <StaticTableList key={tableObject.group} tableObject={tableObject} />
        )
      })}
    </div>
  )
}
