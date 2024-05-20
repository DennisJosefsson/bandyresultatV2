import { getSeasonGames } from '@/lib/requests/games'
import { queryOptions } from '@tanstack/react-query'

export const gameQueries = {
  singleSeasonGames: (seasonId: string) =>
    queryOptions({
      queryKey: ['singleSeasonGames', seasonId],
      queryFn: () => getSeasonGames(seasonId),
    }),
}
