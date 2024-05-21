import { getSeasonGames } from '@/lib/requests/games'
import { queryOptions } from '@tanstack/react-query'

export const gameQueryKeys = {
  seasonGames: (seasonId: string) => ['singleSeasonGames', seasonId] as const,
}

export const gameQueries = {
  singleSeasonGames: (seasonId: string) =>
    queryOptions({
      queryKey: gameQueryKeys.seasonGames(seasonId),
      queryFn: () => getSeasonGames(seasonId),
    }),
}
