import Loading from '@/components/Components/Common/Loading'
import Seasons from '@/components/Components/Dashboard/Seasons'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/seasons')({
  component: Seasons,
  pendingComponent: Loading,
})
