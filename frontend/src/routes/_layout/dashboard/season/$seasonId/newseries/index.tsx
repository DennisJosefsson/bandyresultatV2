import Loading from '@/components/Components/Common/Loading'
import NewSeriesForm from '@/components/Components/Dashboard/Subcomponents/NewSeries'
import { useDashboardStore } from '@/lib/zustand/dashboard/dashboardStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/newseries/'
)({
  component: NewSeries,
  pendingComponent: Loading,
})

function NewSeries() {
  const { seasonId } = Route.useParams()
  const dashboardData = useDashboardStore((state) => state.dashboard)
  return (
    <div>
      <NewSeriesForm
        seasonId={parseInt(seasonId)}
        women={dashboardData.women}
        serieData={dashboardData.seriesData}
      />
    </div>
  )
}
