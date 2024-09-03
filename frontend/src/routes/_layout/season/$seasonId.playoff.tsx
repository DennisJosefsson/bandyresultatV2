import Loading from '@/components/Components/Common/Loading'
import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
import SeasonPlayoffTables from '@/components/Components/Season/SeasonPlayoffComponents/SeasonPlayoffTables'
import { useGetFirstAndLastSeason } from '@/lib/hooks/dataHooks/season/useGetFirstAndLastSeason'
import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'
import { getSingleSeasonPlayoff } from '@/lib/requests/tables'
import { createFileRoute, useLocation } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/_layout/season/$seasonId/playoff')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  component: Playoff,
  pendingComponent: () => <Loading page="seasonPlayoff" />,
  loader: ({ deps, params }) =>
    getSingleSeasonPlayoff({ seasonId: params.seasonId, women: deps.women }),
  errorComponent: ({ error, reset }) => (
    <ErrorComponent error={error} reset={reset} />
  ),
})

function Playoff() {
  const { women } = Route.useSearch()
  const { seasonId } = Route.useParams()
  const { lastSeason } = useGetFirstAndLastSeason()
  const data = Route.useLoaderData()
  useScrollTo()

  if (women && parseInt(seasonId) < 1973) {
    return <NoWomenSeason />
  }

  return (
    <div>
      {parseInt(seasonId) <= lastSeason ? (
        <SeasonPlayoffTables data={data} lastSeason={lastSeason.toString()} />
      ) : null}
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
