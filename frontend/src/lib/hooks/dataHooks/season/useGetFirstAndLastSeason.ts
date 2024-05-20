import { seasonQueries } from '@/lib/queries/season/queries'

import { useSuspenseQuery } from '@tanstack/react-query'

export const useGetFirstAndLastSeason = () => {
  const {
    data: { firstSeason, lastSeason },
  } = useSuspenseQuery(seasonQueries['firstAndLastSeasons']())

  return { firstSeason, lastSeason }
}
