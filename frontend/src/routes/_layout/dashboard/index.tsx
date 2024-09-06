import Loading from '@/components/Components/Common/Loading'
import DashboardData from '@/components/Components/Dashboard/Subcomponents/DashboardData/DashboardData'
import { getDashBoardData } from '@/lib/requests/dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/')({
  loader: () => getDashBoardData(),
  pendingComponent: Loading,
  component: DashboardData,
})
