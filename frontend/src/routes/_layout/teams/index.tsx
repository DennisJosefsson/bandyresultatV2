import { teamQueries } from '@/lib/queries/teams/queries'
import { createFileRoute } from '@tanstack/react-router'

import Loading from '@/components/Components/Common/Loading'

import TeamsList from '@/components/Components/Teams/TeamsList/TeamsList'

export const Route = createFileRoute('/_layout/teams/')({
  component: Teams,
  pendingComponent: () => <Loading page="teamsList" />,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(teamQueries['all']()),
})

function Teams() {
  return <TeamsList />
}
