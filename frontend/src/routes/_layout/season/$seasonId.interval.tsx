import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
import IntervalHeader from '@/components/Components/Season/SeasonIntervalComponents/IntervalHeader'
import { Skeleton } from '@/components/ui/skeleton'
import { getDevelopmentSeries } from '@/lib/requests/series'
import { createFileRoute, notFound, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/season/$seasonId/interval')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ params, deps }) => {
    const series = await getDevelopmentSeries({
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

  pendingComponent: () => (
    <div className="flex flex-row justiy-center mt-2 w-full">
      <Skeleton className="h-9 w-32" />
    </div>
  ),
  component: Subs,
  notFoundComponent: NotFound,
})

function Subs() {
  const gameSeries = Route.useLoaderData({ select: (data) => data.gameSeries })

  if (gameSeries.length === 0) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-[10px] font-bold text-foreground md:text-base">
        <p className="mx-10 text-center">
          Inga spelade seriematcher denna säsong.
        </p>
      </div>
    )
  }

  return (
    <div>
      <IntervalHeader />
      <div className="mt-2">
        <Outlet />
      </div>
    </div>
  )
}

function NotFound() {
  const women = Route.useSearch({ select: (s) => s.women })
  const seasonId = Route.useParams({ select: (params) => params.seasonId })

  if (women && seasonId < 1973) {
    return <NoWomenSeason />
  }

  return (
    <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-[10px] font-bold text-foreground md:text-base">
      <p className="mx-10 text-center">
        Inga matcher finns inlagda för {women ? 'damer' : 'herrar'} denna
        säsong.
      </p>
    </div>
  )
}
