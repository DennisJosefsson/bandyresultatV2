import Loading from '@/components/Components/Common/Loading'
import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
import StatsComponent from '@/components/Components/Season/SeasonStatsComponents/StatsComponent'

import { getSeasonStats } from '@/lib/requests/games'
import { createFileRoute, useLocation } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/_layout/season/$seasonId/stats')({
  component: Stats,
  pendingComponent: () => <Loading page="seasonStats" />,
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: ({ deps, params }) =>
    getSeasonStats({ seasonId: params.seasonId, women: deps.women }),
  errorComponent: ({ error, reset }) => (
    <ErrorComponent error={error} reset={reset} />
  ),
})

function Stats() {
  const { seasonId } = Route.useParams()
  const data = Route.useLoaderData()

  const { women } = Route.useSearch()

  if (women && seasonId < 1973) {
    return <NoWomenSeason />
  }
  if (
    data.gamesCountTotal === 0 ||
    (women && (seasonId === 1973 || seasonId === 1974))
  ) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-foreground md:text-base">
        <p className="mx-10 text-center">Statistik saknas för denna säsong.</p>
      </div>
    )
  }

  return <>{<StatsComponent />}</>
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
