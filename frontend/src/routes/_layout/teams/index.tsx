import { teamQueries } from '@/lib/queries/teams/queries'
import { createFileRoute } from '@tanstack/react-router'

import { useFormContext } from 'react-hook-form'
import MemoTeamsList from '@/components/Components/Teams/MemoTeamsList'
import Loading from '@/components/Components/Common/Loading'

export const Route = createFileRoute('/_layout/teams/')({
  component: TeamsList,
  pendingComponent: Loading,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(teamQueries['all']()),
})

function TeamsList() {
  const methods = useFormContext()
  return <MemoTeamsList methods={methods} name="teamArray" />
}
