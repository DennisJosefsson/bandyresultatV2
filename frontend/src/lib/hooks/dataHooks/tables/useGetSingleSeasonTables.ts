import { tableQueries } from '@/lib/queries/tables/queries'
import { useSuspenseQuery } from '@tanstack/react-query'

export const useGetSingleSeasonTables = (seasonId: string) => {
  const { data, isLoading, error } = useSuspenseQuery(
    tableQueries['singleSeasonTables'](seasonId, 'all', false)
  )

  return {
    data,
    isLoading,
    error,
  }
}
