import Loading from '@/components/Components/Common/Loading'
import AddGame from '@/components/Components/Dashboard/Subcomponents/GamesList/AddGame'
import { getGameFormData } from '@/lib/requests/dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/games/$serieId/addGame'
)({
  loader: ({ params }) => getGameFormData({ seasonId: params.seasonId }),
  pendingComponent: Loading,
  component: AddGame,
})
