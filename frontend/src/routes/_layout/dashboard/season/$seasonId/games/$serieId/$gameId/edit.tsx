import Loading from '@/components/Components/Common/Loading'
import EditGame from '@/components/Components/Dashboard/Subcomponents/GamesList/EditGame'
import { getGameFormData } from '@/lib/requests/dashboard'
import { getSingleGame } from '@/lib/requests/games'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/games/$serieId/$gameId/edit'
)({
  loader: async ({ params }) => {
    const gameFormData = await getGameFormData({ seasonId: params.seasonId })
    const gameData = await getSingleGame({ gameId: params.gameId })
    return { gameFormData, gameData }
  },
  pendingComponent: Loading,
  component: EditGame,
})
