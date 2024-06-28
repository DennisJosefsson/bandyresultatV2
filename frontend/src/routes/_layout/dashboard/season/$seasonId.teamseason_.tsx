import Loading from '@/components/Components/Common/Loading'
import TeamSeasonForm from '@/components/Components/Dashboard/Subcomponents/TeamSeasonForm'
import { useDashboardTeamSeasonStore } from '@/lib/zustand/dashboard/teamSeasonStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/teamseason'
)({
  component: TeamSeasonComponent,
  pendingComponent: Loading,
})

function TeamSeasonComponent() {
  const { seasonId } = Route.useParams()
  const dashboardData = useDashboardTeamSeasonStore(
    (state) => state.dashboardTeamSeason
  )
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
