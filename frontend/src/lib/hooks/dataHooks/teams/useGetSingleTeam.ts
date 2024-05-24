import { teamQueries } from '@/lib/queries/teams/queries'
import { useSuspenseQuery } from '@tanstack/react-query'

export const useGetSingleTeam = (teamId: string) => {
  const { data, isLoading, error, isSuccess } = useSuspenseQuery(
    teamQueries['singleTeam'](teamId)
  )

  return { data, isLoading, error, isSuccess }
}
