import Loading from '@/components/Components/Common/Loading'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_layout/dashboard/season/$seasonId')({
  params: {
    parse: (params) => ({
      seasonId: z.number().int().parse(Number(params.seasonId)),
    }),
    stringify: ({ seasonId }) => ({ seasonId: `${seasonId}` }),
  },
  component: DashboardSeason,
  pendingComponent: Loading,
  errorComponent: () => <div>Något gick fel, outlet-route</div>,
})

function DashboardSeason() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
