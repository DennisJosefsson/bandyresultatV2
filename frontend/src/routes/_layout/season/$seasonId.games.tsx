import Loading from '@/components/Components/Common/Loading'
import SeasonGames from '@/components/Components/Season/SeasonGamesComponents/SeasonGames'

import { getSeasonGames } from '@/lib/requests/games'
import { createFileRoute, useLocation } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/_layout/season/$seasonId/games')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  component: SeasonGames,
  pendingComponent: () => <Loading page="seasonGamesList" />,
  loader: ({ deps, params }) =>
    getSeasonGames({ seasonId: params.seasonId, women: deps.women }),
  errorComponent: ({ error, reset }) => (
    <ErrorComponent error={error} reset={reset} />
  ),
})

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
