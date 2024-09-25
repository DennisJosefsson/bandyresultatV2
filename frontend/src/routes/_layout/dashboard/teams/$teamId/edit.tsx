import Loading from '@/components/Components/Common/Loading'
import EditTeam from '@/components/Components/Dashboard/Subcomponents/TeamsList/EditTeam'
import { getCounties } from '@/lib/requests/county'
import { getSingleTeamForEdit } from '@/lib/requests/teams'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/teams/$teamId/edit')({
  pendingComponent: Loading,
  loader: async ({ params }) => {
    const teamData = await getSingleTeamForEdit(params.teamId)
    const counties = await getCounties()

    return { teamData, counties }
  },

  component: EditTeam,
})
