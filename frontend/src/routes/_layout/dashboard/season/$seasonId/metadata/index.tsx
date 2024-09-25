import Loading from '@/components/Components/Common/Loading'
import MetadataForm from '@/components/Components/Dashboard/Subcomponents/MetadataForm'
import { getDashBoardSingleSeason } from '@/lib/requests/dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/metadata/'
)({
  loader: ({ params }) =>
    getDashBoardSingleSeason({ seasonId: params.seasonId }),
  component: MetadataForm,
  pendingComponent: Loading,
})
