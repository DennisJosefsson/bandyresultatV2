import { useSuspenseQuery } from '@tanstack/react-query'
import { teamQueries } from '@/lib/queries/teams/queries'

export const useGetTeams = () => {
  const { data, isLoading, error, isSuccess } = useSuspenseQuery(
    teamQueries['all']()
  )
  return {
    data,
    isLoading,
    error,
    isSuccess,
  }
}
