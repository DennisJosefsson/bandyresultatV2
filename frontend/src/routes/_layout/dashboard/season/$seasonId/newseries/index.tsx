import Loading from '@/components/Components/Common/Loading'
import AddSeries from '@/components/Components/Dashboard/Subcomponents/Series/AddSeries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/newseries/'
)({
  component: AddSeries,
  pendingComponent: Loading,
})
