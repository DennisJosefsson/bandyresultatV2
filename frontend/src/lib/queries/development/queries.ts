import { getAnimation } from '@/lib/requests/games'
import { queryOptions } from '@tanstack/react-query'

export const developmentKeys = {
  data: (seasonId: string) => ['animationData', seasonId] as const,
}

export const developmentQueries = {
  data: (seasonId: string) =>
    queryOptions({
      queryKey: developmentKeys.data(seasonId),
      queryFn: () => getAnimation(seasonId),
    }),
}
