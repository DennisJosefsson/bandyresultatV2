import Loading from '@/components/Components/Common/Loading'
import GamesListItem from '@/components/Components/Dashboard/Subcomponents/GamesList/GamesListItem'
import { Button } from '@/components/ui/button'
import { getGamesBySerieId } from '@/lib/requests/dashboard'
import { GameObjectType } from '@/lib/types/games/games'
import { setGame } from '@/lib/zustand/games/gameStore'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/games/$serieId'
)({
  loader: ({ params }) => getGamesBySerieId({ serieId: params.serieId }),
  pendingComponent: Loading,
  component: Games,
})

function Games() {
  const games = Route.useLoaderData()
  const women = Route.useSearch({ select: (search) => search.women })
  const navigate = useNavigate({
    from: '/dashboard/season/$seasonId/games/$serieId',
  })
  const seasonId = Route.useParams({ select: (params) => params.seasonId })
  const changeButtonOnClick = (game: GameObjectType, gameId: number) => {
    setGame(game)
    navigate({
      to: '$gameId/edit',
      params: { gameId: gameId.toString() },
      search: { women },
    })
  }
  const deleteButtonOnClick = (gameId: number) => {
    navigate({
      to: '$gameId/delete',
      params: { gameId: gameId.toString() },
      search: { women },
    })
  }

  if (games.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-end mt-2">
          <Button
            onClick={() =>
              navigate({
                to: '/dashboard/season/$seasonId',
                params: { seasonId },
                search: { women },
              })
            }
          >
            Tillbaka
          </Button>
        </div>
        <div className="flex flex-row justify-center">
          Inga matcher i denna grupp.
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-row gap-2">
      <div className="w-full p-2 flex flex-row justify-between">
        <div>
          {games.map((game) => {
            return (
              <GamesListItem
                key={game.gameId}
                game={game}
                changeButtonOnClick={changeButtonOnClick}
                deleteButtonOnClick={deleteButtonOnClick}
              />
            )
          })}
        </div>
        <div>
          <Button
            onClick={() =>
              navigate({
                to: '/dashboard/season/$seasonId',
                params: { seasonId },
                search: { women },
              })
            }
          >
            Tillbaka
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
