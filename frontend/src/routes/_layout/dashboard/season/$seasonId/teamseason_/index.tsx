import Loading from '@/components/Components/Common/Loading'
import TeamSeasonForm from '@/components/Components/Dashboard/Subcomponents/TeamSeason/AddTeamSeasons'
import { getTeams } from '@/lib/requests/teams'
import { getSingleSeasonTeamSeasons } from '@/lib/requests/teamSeason'

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
  return (
    <div>
      <TeamSeasonForm />
    </div>
  )
}
