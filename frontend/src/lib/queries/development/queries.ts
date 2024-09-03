import { getAnimation } from '@/lib/requests/games'
import { queryOptions } from '@tanstack/react-query'

export const developmentKeys = {
  data: (seasonId: string, women: boolean) =>
    ['animationData', [seasonId, women]] as const,
}

export const developmentQueries = {
  data: (seasonId: string, women: boolean) =>
    queryOptions({
      queryKey: developmentKeys.data(seasonId, women),
      queryFn: () => getAnimation({ seasonId, women }),
    }),
}
