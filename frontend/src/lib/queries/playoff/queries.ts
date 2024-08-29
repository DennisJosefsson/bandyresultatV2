import { getSingleSeasonPlayoff } from '@/lib/requests/tables'
import { queryOptions } from '@tanstack/react-query'

export const playoffKeys = {
  data: (seasonId: string, women: boolean) =>
    ['singleSeasonPlayoff', [seasonId, women]] as const,
}

export const playoffQueries = {
  data: (seasonId: string, women: boolean) =>
    queryOptions({
      queryKey: playoffKeys.data(seasonId, women),
      queryFn: () => getSingleSeasonPlayoff({ seasonId, women }),
    }),
}
