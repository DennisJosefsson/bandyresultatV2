import Loading from '@/components/Components/Common/Loading'
import BulkAddGame from '@/components/Components/Dashboard/Subcomponents/BulkAddGame/BulkAddGame'
import { useDashboardStore } from '@/lib/zustand/dashboard/dashboardStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/bulkgames'
)({
  component: BulkGames,
  pendingComponent: Loading,
})

function BulkGames() {
  const { seasonId } = Route.useParams()
  const dashboardData = useDashboardStore((state) => state.dashboard)
  return (
    <div>
      <BulkAddGame
        women={dashboardData.women}
        seasonYear={dashboardData.year}
        seasonId={parseInt(seasonId)}
        teams={dashboardData.teamSeasonData}
        series={dashboardData.seriesArray}
      />
    </div>
  )
}
