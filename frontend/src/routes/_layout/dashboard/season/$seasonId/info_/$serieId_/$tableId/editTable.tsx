import Loading from '@/components/Components/Common/Loading'
import EditTable from '@/components/Components/Dashboard/Subcomponents/Series/EditTable'
import { getDashboardSerieInfo } from '@/lib/requests/dashboard'
import { getStaticTable } from '@/lib/requests/tables'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info/$serieId/$tableId/editTable'
)({
  params: {
    parse: (params) => ({
      serieId: z.number().int().parse(Number(params.serieId)),
      tableId: z.number().int().parse(Number(params.tableId)),
    }),
    stringify: ({ serieId, tableId }) => ({
      serieId: `${serieId}`,
      tableId: `${tableId}`,
    }),
  },

  loader: async ({ params }) => {
    const staticTable = await getStaticTable({ tableId: params.tableId })
    const seriesData = await getDashboardSerieInfo({ serieId: params.serieId })
    return { staticTable, seriesData }
  },
  pendingComponent: Loading,
  component: EditTable,
})
