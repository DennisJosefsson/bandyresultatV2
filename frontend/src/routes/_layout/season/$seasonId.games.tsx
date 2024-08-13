import Loading from '@/components/Components/Common/Loading'
import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
import FilterComponent from '@/components/Components/Season/SeasonGamesComponents/FilterComponent'
import GameForm from '@/components/Components/Season/SeasonGamesComponents/GameForm'
import PlayedGames from '@/components/Components/Season/SeasonGamesComponents/PlayedGames'
import UnplayedGames from '@/components/Components/Season/SeasonGamesComponents/UnplayedGames'
import { useGamesSingleSeason } from '@/lib/hooks/dataHooks/games/useGamesSingleSeason'
import { useSingleSeasonGames } from '@/lib/hooks/dataHooks/games/useSingleSeasonGames'
import { useGetFirstAndLastSeason } from '@/lib/hooks/dataHooks/season/useGetFirstAndLastSeason'
import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'
import { gameQueries } from '@/lib/queries/games/queries'
import { seasonQueries } from '@/lib/queries/season/queries'
import { createFileRoute, useLocation } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'

const teamFilterSearch = z.object({ team: z.string().optional() })

export const Route = createFileRoute('/_layout/season/$seasonId/games')({
  component: Games,
  pendingComponent: Loading,
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(
      seasonQueries['singleSeason'](params.seasonId)
    )
    context.queryClient.ensureQueryData(
      gameQueries['singleSeasonGames'](params.seasonId)
    )
  },
  validateSearch: teamFilterSearch,
  errorComponent: ({ error, reset }) => (
    <ErrorComponent error={error} reset={reset} />
  ),
})

function Games() {
  const { seasonId } = Route.useParams()
  const { team, women } = Route.useSearch()
  const [teamFilter, setTeamFilter] = useState<string>(team ?? '')

  const [showAddGameModal, setShowAddGameModal] = useState<boolean>(false)
  const { playedGamesLength, unplayedGamesLength } = useSingleSeasonGames(
    seasonId,
    teamFilter
  )
  const { genderSeason } = useGamesSingleSeason(seasonId)

  const { lastSeason } = useGetFirstAndLastSeason()

  useScrollTo()

  if (women && parseInt(seasonId) < 1973) {
    return <NoWomenSeason />
  }

  if (playedGamesLength + unplayedGamesLength === 0) {
    return (
      <div className="flex flex-row justify-center mt-2 font-semibold">
        Inga matcher än denna säsong.
      </div>
    )
  }
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col font-inter text-foreground">
      <FilterComponent
        setTeamFilter={setTeamFilter}
        teamFilter={teamFilter}
        seasonId={seasonId}
      />

      {parseInt(seasonId) <= lastSeason && (
        <div className="mx-1 mt-2 grid grid-cols-1 lg:grid-cols-2 xl:mx-0">
          {playedGamesLength > 0 && (
            <PlayedGames
              teamFilter={teamFilter}
              setShowAddGameModal={setShowAddGameModal}
            />
          )}
          {unplayedGamesLength > 0 && (
            <UnplayedGames
              teamFilter={teamFilter}
              setShowAddGameModal={setShowAddGameModal}
            />
          )}
        </div>
      )}
      {showAddGameModal ? (
        <>
          <GameForm
            women={women}
            season={genderSeason}
            setShowModal={setShowAddGameModal}
          />
        </>
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

  return <div>Fel</div>
}
