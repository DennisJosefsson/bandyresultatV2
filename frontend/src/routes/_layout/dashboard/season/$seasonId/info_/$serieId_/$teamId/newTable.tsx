import Loading from '@/components/Components/Common/Loading'
import AddTable from '@/components/Components/Dashboard/Subcomponents/Series/AddTable'
import { getDashboardSerieInfo } from '@/lib/requests/dashboard'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info/$serieId/$teamId/newTable'
)({
  params: {
    parse: (params) => ({
      serieId: z.number().int().parse(Number(params.serieId)),
      teamId: z.number().int().parse(Number(params.teamId)),
    }),
    stringify: ({ serieId, teamId }) => ({
      serieId: `${serieId}`,
      teamId: `${teamId}`,
    }),
  },
  loader: ({ params }) => getDashboardSerieInfo({ serieId: params.serieId }),
  pendingComponent: Loading,
  component: AddTable,
})
