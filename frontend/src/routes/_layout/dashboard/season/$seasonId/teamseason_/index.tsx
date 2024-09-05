import Loading from '@/components/Components/Common/Loading'
import TeamSeasonForm from '@/components/Components/Dashboard/Subcomponents/TeamSeasonForm'
import { useDashboardStore } from '@/lib/zustand/dashboard/dashboardStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/teamseason/'
)({
  component: TeamSeasonComponent,
  pendingComponent: Loading,
})

function TeamSeasonComponent() {
  const { seasonId } = Route.useParams()
  const dashboardData = useDashboardStore((state) => state.dashboard)
  return (
    <div>
      <TeamSeasonForm
        seasonId={parseInt(seasonId)}
        women={dashboardData.women}
        teamSeasonData={dashboardData.teamSeasonData}
      />
    </div>
  )
}
