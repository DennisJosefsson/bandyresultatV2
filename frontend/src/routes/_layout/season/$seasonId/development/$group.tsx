import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/season/$seasonId/development/$group'
)({
  component: DevelopmentData,
})

function DevelopmentData() {
  const group = Route.useParams({ select: (params) => params.group })

  return <div>Hello, {group}</div>
}
