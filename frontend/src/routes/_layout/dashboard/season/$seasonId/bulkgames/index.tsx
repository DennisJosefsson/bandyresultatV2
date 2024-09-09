import Loading from '@/components/Components/Common/Loading'
import BulkAddGame from '@/components/Components/Dashboard/Subcomponents/BulkAddGame/BulkAddGame'
import { useDashboardStore } from '@/lib/zustand/dashboard/dashboardStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/bulkgames/'
)({
  component: BulkGames,
  pendingComponent: Loading,
})

function BulkGames() {
  const seasonId = Route.useParams({ select: (params) => params.seasonId })
  const dashboardData = useDashboardStore((state) => state.dashboard)
  return (
    <div>
      <BulkAddGame
        women={dashboardData.women}
        seasonId={seasonId}
        teams={dashboardData.teamSeasonData}
        series={dashboardData.seriesArray}
      />
    </div>
  )
}
