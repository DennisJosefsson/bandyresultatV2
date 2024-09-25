import Loading from '@/components/Components/Common/Loading'
import Seasons from '@/components/Components/Dashboard/Seasons'
import { getSeasons } from '@/lib/requests/seasons'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/seasons')({
  loader: () => getSeasons(),
  component: Seasons,
  pendingComponent: Loading,
})
