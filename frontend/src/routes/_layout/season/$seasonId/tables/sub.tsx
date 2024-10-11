import Loading from '@/components/Components/Common/Loading'
import { Button } from '@/components/ui/button'
import { getSubSeries } from '@/lib/requests/series'
import { createFileRoute, Link, notFound, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/season/$seasonId/tables/sub')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ params, deps }) => {
    const series = await getSubSeries({
      seasonId: params.seasonId,
      women: deps.women,
    })

    if (
      typeof series === 'object' &&
      'errors' in series &&
      series.errors === 'No sub series'
    ) {
      throw notFound()
    }
    return series
  },

  pendingComponent: Loading,
  component: Subs,
  notFoundComponent: NotFound,
})

function Subs() {
  const allSeries = Route.useLoaderData({ select: (data) => data.allSeries })
  if (allSeries.length === 0) {
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
      <div className="flex flex-row gap-1 justify-center mt-2">
        {allSeries.map((serie) => {
          return (
            <Link
              from={Route.fullPath}
              to="$group"
              params={{ group: serie.serieGroupCode }}
              search={(prev) => ({ ...prev })}
              key={serie.serieId}
            >
              {({ isActive }) => {
                return (
                  <Button variant={isActive ? 'default' : 'outline'} size="sm">
                    {serie.serieName}
                  </Button>
                )
              }}
            </Link>
          )
        })}
      </div>
      <div className="mt-2">
        <Outlet />
      </div>
    </div>
  )
}

function NotFound() {
  const women = Route.useSearch({ select: (s) => s.women })
  return (
    <div className="mt-2 flex flex-row justify-center">
      <p>
        Inga lägre divisioner finns inlagda för {women ? 'damer' : 'herrar'}{' '}
        denna säsong. Gå till{' '}
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
