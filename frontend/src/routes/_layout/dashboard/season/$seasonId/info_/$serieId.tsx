import Loading from '@/components/Components/Common/Loading'
import SeriesInfo from '@/components/Components/Dashboard/Subcomponents/Series/SeriesInfo'
import {
  getDashboardSerieInfo,
  getDashBoardSingleSeason,
} from '@/lib/requests/dashboard'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info/$serieId'
)({
  params: {
    parse: (params) => ({
      serieId: z.number().int().parse(Number(params.serieId)),
    }),
    stringify: ({ serieId }) => ({ serieId: `${serieId}` }),
  },
  loader: async ({ params }) => {
    const seriesInfo = await getDashboardSerieInfo({ serieId: params.serieId })
    const season = await getDashBoardSingleSeason({ seasonId: params.seasonId })
    return { seriesInfo, season }
  },
  pendingComponent: Loading,
  component: SeriesInfo,
})
