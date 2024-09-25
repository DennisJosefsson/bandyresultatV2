import Loading from '@/components/Components/Common/Loading'
import GamesListItem from '@/components/Components/Dashboard/Subcomponents/GamesList/GamesListItem'
import { Button } from '@/components/ui/button'
import { getGamesBySerieId } from '@/lib/requests/dashboard'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/games/$serieId'
)({
  params: {
    parse: (params) => ({
      serieId: z.number().int().parse(Number(params.serieId)),
    }),
    stringify: ({ serieId }) => ({ serieId: `${serieId}` }),
  },
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
  const changeButtonOnClick = (gameId: number) => {
    navigate({
      to: '$gameId/edit',
      params: { gameId },
      search: { women },
    })
  }
  const deleteButtonOnClick = (gameId: number) => {
    navigate({
      to: '$gameId/delete',
      params: { gameId },
      search: { women },
    })
  }

  return (
    <div className="flex flex-row gap-2">
      <div className="w-full p-2 flex flex-row justify-between">
        <div>
          {games.length === 0 ? <p>Inga matcher i denna serie.</p> : null}
          {games.length > 0 ? (
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
          ) : null}
        </div>

        <div className="flex flex-row gap-2">
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
          <Button
            onClick={() =>
              navigate({
                to: './addGame',
                params: { seasonId },
                search: { women },
              })
            }
          >
            Lägg till match
          </Button>
          <Button
            onClick={() =>
              navigate({
                to: './bulkGames',
                params: { seasonId },
                search: { women },
              })
            }
          >
            Lägg till matcher
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
