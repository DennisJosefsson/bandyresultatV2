import Loading from '@/components/Components/Common/Loading'
import TeamSeasonForm from '@/components/Components/Dashboard/Subcomponents/TeamSeasonForm'
import { getTeams } from '@/lib/requests/teams'
import { getSingleSeasonTeamSeasons } from '@/lib/requests/teamSeason'
import { useDashboardStore } from '@/lib/zustand/dashboard/dashboardStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/teamseason/'
)({
  loader: async ({ params }) => {
    const allTeams = await getTeams()
    const teamseasons = await getSingleSeasonTeamSeasons({
      seasonId: params.seasonId,
    })
    return { allTeams, teamseasons }
  },
  component: TeamSeasonComponent,
  pendingComponent: Loading,
})

function TeamSeasonComponent() {
  const dashboardData = useDashboardStore((state) => state.dashboard)
  return (
    <div>
      <TeamSeasonForm women={dashboardData.women} />
    </div>
  )
}
