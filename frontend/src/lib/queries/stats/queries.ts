import { getSeasonStats } from '@/lib/requests/games'
import { queryOptions } from '@tanstack/react-query'

export const statsKeys = {
  data: (seasonId: string) => ['singleSeasonStats', seasonId] as const,
}

export const statsQueries = {
  data: (seasonId: string) =>
    queryOptions({
      queryKey: statsKeys.data(seasonId),
      queryFn: () => getSeasonStats(seasonId),
    }),
}
