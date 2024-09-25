import Loading from '@/components/Components/Common/Loading'
import EditSeries from '@/components/Components/Dashboard/Subcomponents/Series/EditSeries'
import { getSingleSeries } from '@/lib/requests/series'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/games/$serieId/edit/'
)({
  params: {
    parse: (params) => ({
      serieId: z.number().int().parse(Number(params.serieId)),
    }),
    stringify: ({ serieId }) => ({ serieId: `${serieId}` }),
  },
  loader: ({ params }) => getSingleSeries({ serieId: params.serieId }),
  pendingComponent: Loading,
  component: EditSeries,
})
