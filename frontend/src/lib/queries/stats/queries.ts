import { getSeasonStats } from '@/lib/requests/games'
import { queryOptions } from '@tanstack/react-query'

export const statsKeys = {
  data: (seasonId: string, women: boolean) =>
    ['singleSeasonStats', [seasonId, women]] as const,
}

export const statsQueries = {
  data: (seasonId: string, women: boolean) =>
    queryOptions({
      queryKey: statsKeys.data(seasonId, women),
      queryFn: () => getSeasonStats({ seasonId, women }),
    }),
}
