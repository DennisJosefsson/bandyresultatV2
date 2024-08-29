import { createFileRoute } from '@tanstack/react-router'

import Loading from '@/components/Components/Common/Loading'

import TeamsList from '@/components/Components/Teams/TeamsList/TeamsList'

export const Route = createFileRoute('/_layout/teams/')({
  component: Teams,
  pendingComponent: () => <Loading page="teamsList" />,
})

function Teams() {
  return <TeamsList />
}
