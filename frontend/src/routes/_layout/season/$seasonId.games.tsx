import Loading from '@/components/Components/Common/Loading'
import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
import FilterComponent from '@/components/Components/Season/SeasonGamesComponents/FilterComponent'
import GameForm from '@/components/Components/Season/SeasonGamesComponents/GameForm'
import PlayedGames from '@/components/Components/Season/SeasonGamesComponents/PlayedGames'
import UnplayedGames from '@/components/Components/Season/SeasonGamesComponents/UnplayedGames'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { useGamesSingleSeason } from '@/lib/hooks/dataHooks/games/useGamesSingleSeason'
import { useSingleSeasonGames } from '@/lib/hooks/dataHooks/games/useSingleSeasonGames'
import { useGetFirstAndLastSeason } from '@/lib/hooks/dataHooks/season/useGetFirstAndLastSeason'
import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'
import { gameQueries } from '@/lib/queries/games/queries'
import { seasonQueries } from '@/lib/queries/season/queries'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

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
})

function Games() {
  const { seasonId } = Route.useParams()
  const { women } = useGenderContext()

  const [teamFilter, setTeamFilter] = useState<string>('')

  const [showAddGameModal, setShowAddGameModal] = useState<boolean>(false)
  const { playedGamesLength, unplayedGamesLength } = useSingleSeasonGames(
    seasonId,
    teamFilter
  )
  const { genderSeason } = useGamesSingleSeason(seasonId)

  const { lastSeason } = useGetFirstAndLastSeason()

  useScrollTo()

  useEffect(() => {
    setTeamFilter('')
  }, [seasonId])

  if (women && parseInt(seasonId) < 1973) {
    return <NoWomenSeason />
  }
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col font-inter text-foreground">
      <FilterComponent setTeamFilter={setTeamFilter} teamFilter={teamFilter} />

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
