import { teamQueries } from '@/lib/queries/teams/queries'
import { createFileRoute } from '@tanstack/react-router'

import { useFormContext } from 'react-hook-form'
import MemoTeamsList from '@/components/Components/Teams/MemoTeamsList'
import Loading from '@/components/Components/Common/Loading'

import { z } from 'zod'

const teamSearchParams = z.object({ women: z.boolean() })

export const Route = createFileRoute('/_layout/teams/')({
  beforeLoad: ({ context, search }) => {
    if (search.women !== context.genderContext.women)
      context.genderContext.dispatch({ type: 'SET', payload: search.women })
  },
  component: TeamsList,
  pendingComponent: Loading,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(teamQueries['all']()),
  validateSearch: teamSearchParams,
})

function TeamsList() {
  const methods = useFormContext()
  return <MemoTeamsList methods={methods} name="teamArray" />
}
