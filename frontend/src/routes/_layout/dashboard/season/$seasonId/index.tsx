import Loading from '@/components/Components/Common/Loading'
import Season from '@/components/Components/Dashboard/Subcomponents/Season/Season'
import { getDashBoardSingleSeason } from '@/lib/requests/dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/season/$seasonId/')({
  loader: ({ params }) =>
    getDashBoardSingleSeason({ seasonId: params.seasonId }),
  component: Season,
  pendingComponent: Loading,
})
