import Loading from '@/components/Components/Common/Loading'
import MetadataForm from '@/components/Components/Dashboard/Subcomponents/MetadataForm'
import { useDashboardStore } from '@/lib/zustand/dashboard/dashboardStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/metadata/'
)({
  component: Metadata,
  pendingComponent: Loading,
})

function Metadata() {
  const { seasonId } = Route.useParams()
  const dashboardData = useDashboardStore((state) => state.dashboard)
  return (
    <div>
      <MetadataForm
        seasonId={parseInt(seasonId)}
        metadataData={dashboardData.metadataData}
        teams={dashboardData.teamSeasonData}
      />
    </div>
  )
}
