import Loading from '@/components/Components/Common/Loading'
import GameForm from '@/components/Components/Season/SeasonGamesComponents/GameForm'
import { getGameFormData } from '@/lib/requests/dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/games/$serieId/$gameId/edit'
)({
  loader: ({ params }) => getGameFormData({ seasonId: params.seasonId }),
  pendingComponent: Loading,
  component: GameForm,
})
