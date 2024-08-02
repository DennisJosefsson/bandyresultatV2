import { teamQueries } from '@/lib/queries/teams/queries'
import { createFileRoute } from '@tanstack/react-router'

import Loading from '@/components/Components/Common/Loading'
// import MemoTeamsList from '@/components/Components/Teams/MemoTeamsList'

// import { useFormContext } from 'react-hook-form'

import TeamsList from '@/components/Components/Teams/TeamsList/TeamsList'

export const Route = createFileRoute('/_layout/teams/')({
  component: Teams,
  pendingComponent: Loading,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(teamQueries['all']()),
})

function Teams() {
  // const methods = useFormContext()
  // return <MemoTeamsList methods={methods} name="teamArray" />
  return <TeamsList />
}
