import Loading from '@/components/Components/Common/Loading'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/season/$seasonId/tables/sub/$group'
)({
  pendingComponent: Loading,
  component: GroupTable,
})

function GroupTable() {
  const group = Route.useParams({ select: (param) => param.group })
  return <div>Hello {group}!</div>
}
