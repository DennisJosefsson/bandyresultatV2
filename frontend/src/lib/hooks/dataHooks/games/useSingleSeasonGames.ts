import { gameQueries } from '@/lib/queries/games/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams, useSearch } from '@tanstack/react-router'

export const useSingleSeasonGames = () => {
  console.log('useSingleSeasonGames')
  const { women } = useSearch({ from: '/_layout/season/$seasonId/games' })
  const seasonId = useParams({
    from: '/_layout/season/$seasonId/games',
    select: (param) => param.seasonId,
  })

  const { data, isLoading, error } = useSuspenseQuery(
    gameQueries['singleSeasonGames'](seasonId)
  )

  const games = women ? data['women'] : data['men']

  const playedGamesLength = games['playedLength']
  const unplayedGamesLength = games['unplayedLength']

  const playedGames = games['played']

  const unplayedGames = games['unplayed']

  return {
    games: { playedGames, unplayedGames },
    playedGamesLength,
    unplayedGamesLength,
    isLoading,
    error,
  }
}
