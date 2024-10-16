import Loading from '@/components/Components/Common/Loading'
import EditTeamSeason from '@/components/Components/Dashboard/Subcomponents/TeamSeason/EditTeamSeason'
import { getSingleTeamseason } from '@/lib/requests/teamSeason'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/teamseason/$teamseasonId/edit'
)({
  params: {
    parse: (params) => ({
      teamseasonId: z.number().int().parse(Number(params.teamseasonId)),
    }),
    stringify: ({ teamseasonId }) => ({ teamseasonId: `${teamseasonId}` }),
  },
  loader: ({ params }) =>
    getSingleTeamseason({ teamseasonId: params.teamseasonId }),
  pendingComponent: Loading,
  component: EditTeamSeason,
})
