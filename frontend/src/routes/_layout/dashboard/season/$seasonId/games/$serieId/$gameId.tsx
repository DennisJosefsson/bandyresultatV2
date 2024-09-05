import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/games/$serieId/$gameId'
)({
  component: () => <Outlet />,
})
