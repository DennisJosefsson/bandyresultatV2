import Loading from '@/components/Components/Common/Loading'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/season/$seasonId/games/sub/$group'
)({
  pendingComponent: Loading,
  component: GroupGames,
})

function GroupGames() {
  const group = Route.useParams({ select: (params) => params.group })

  return <div>Hello, {group}!</div>
}
