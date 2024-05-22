import { getSingleSeasonTable } from '@/lib/requests/tables'
import { queryOptions } from '@tanstack/react-query'

export const playoffKeys = {
  data: (seasonId: string) => ['singleSeasonTable', seasonId] as const,
}

export const playoffQueries = {
  data: (seasonId: string) =>
    queryOptions({
      queryKey: playoffKeys.data(seasonId),
      queryFn: () => getSingleSeasonTable(seasonId),
    }),
}
