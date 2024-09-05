import DeleteDialog from '@/components/Components/Dashboard/Subcomponents/GamesList/DeleteDialog'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/games/$serieId/$gameId/delete'
)({
  component: DeleteDialog,
})
