import Loading from '@/components/Components/Common/Loading'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/season/$seasonId')({
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
