import Loading from '@/components/Components/Common/Loading'
import AddTeam from '@/components/Components/Dashboard/Subcomponents/TeamsList/AddTeam'
import { getCounties } from '@/lib/requests/county'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/addTeams')({
  loader: () => getCounties(),
  component: AddTeam,
  pendingComponent: Loading,
})
