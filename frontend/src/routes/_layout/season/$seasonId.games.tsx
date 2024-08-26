import Loading from '@/components/Components/Common/Loading'
import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
import Games from '@/components/Components/Season/SeasonGamesComponents/Games'
//import { useSingleSeasonGames } from '@/lib/hooks/dataHooks/games/useSingleSeasonGames'
import { useGetFirstAndLastSeason } from '@/lib/hooks/dataHooks/season/useGetFirstAndLastSeason'
import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'
//import { gameQueries } from '@/lib/queries/games/queries'
import { getSeasonGames } from '@/lib/requests/games'
import { createFileRoute, useLocation } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/_layout/season/$seasonId/games')({
  component: SeasonGames,
  pendingComponent: () => <Loading page="seasonGamesList" />,
  loader: ({ params }) => getSeasonGames(params.seasonId),
  errorComponent: ({ error, reset }) => (
    <ErrorComponent error={error} reset={reset} />
  ),
})

function SeasonGames() {
  const seasonId = Route.useParams({
    select: (param) => param.seasonId,
  })
  const women = Route.useSearch({ select: (search) => search.women })
  const games = Route.useLoaderData({
    select: (data) => (women ? data.women : data.men),
  })

  const { lastSeason } = useGetFirstAndLastSeason()

  useScrollTo()

  if (women && parseInt(seasonId) < 1973) {
    return <NoWomenSeason />
  }

  if (games['playedLength'] + games['unplayedLength'] === 0) {
    return (
      <div className="flex flex-row justify-center mt-2 font-semibold">
        Inga matcher än denna säsong.
      </div>
    )
  }
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col font-inter text-foreground">
      {parseInt(seasonId) <= lastSeason && (
        <div className="mx-1 mt-2 grid grid-cols-1 lg:grid-cols-2 xl:mx-0 lg:gap-1">
          {games['playedLength'] > 0 ? (
            <Games games={games['played']} title="Spelade" />
          ) : null}
          {games['unplayedLength'] > 0 ? (
            <Games games={games['unplayed']} title="Kommande" />
          ) : null}
        </div>
      )}
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

  return <div>Fel</div>
}
