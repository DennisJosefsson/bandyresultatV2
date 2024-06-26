import Loading from '@/components/Components/Common/Loading'
import NewSeason from '@/components/Components/Dashboard/NewSeason'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/newSeason')({
  component: NewSeason,
  pendingComponent: Loading,
})
