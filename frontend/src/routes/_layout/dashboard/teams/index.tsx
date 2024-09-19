import Loading from '@/components/Components/Common/Loading'
import TeamsList from '@/components/Components/Dashboard/Subcomponents/TeamsList'
import { getTeams } from '@/lib/requests/teams'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/teams/')({
  pendingComponent: Loading,
  loader: () => getTeams(),
  component: Teams,
})

function Teams() {
  return <TeamsList />
}