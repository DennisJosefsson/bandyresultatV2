import Loading from '@/components/Components/Common/Loading'
import AddSeries from '@/components/Components/Dashboard/Subcomponents/Series/AddSeries'
import { useDashboardStore } from '@/lib/zustand/dashboard/dashboardStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/newseries/'
)({
  component: NewSeries,
  pendingComponent: Loading,
})

function NewSeries() {
  const dashboardData = useDashboardStore((state) => state.dashboard)
  return (
    <div>
      <AddSeries women={dashboardData.women} />
    </div>
  )
}
