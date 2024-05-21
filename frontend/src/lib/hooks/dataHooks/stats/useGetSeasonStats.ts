import { useSuspenseQuery } from '@tanstack/react-query'

import { statsQueries } from '@/lib/queries/stats/queries'

export const useGetSeasonStats = (seasonId: string) => {
  const { data, isLoading, error, isSuccess } = useSuspenseQuery(
    statsQueries['data'](seasonId)
  )

  return { data, isLoading, error, isSuccess }
}
