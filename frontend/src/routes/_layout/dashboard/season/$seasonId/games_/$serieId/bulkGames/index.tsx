import Loading from '@/components/Components/Common/Loading'
import BulkAddGame from '@/components/Components/Dashboard/Subcomponents/BulkAddGame/BulkAddGame'
import { getSingleSeries } from '@/lib/requests/series'
import { getTeamsFromSeries } from '@/lib/requests/teamSeries'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/games/$serieId/bulkGames/'
)({
  params: {
    parse: (params) => ({
      serieId: z.number().int().parse(Number(params.serieId)),
    }),
    stringify: ({ serieId }) => ({ serieId: `${serieId}` }),
  },
  loader: async ({ params }) => {
    const serie = await getSingleSeries({ serieId: params.serieId })
    const teams = await getTeamsFromSeries({
      serieId: params.serieId,
    })
    return { serie, teams }
  },
  pendingComponent: Loading,
  component: BulkAddGame,
})
