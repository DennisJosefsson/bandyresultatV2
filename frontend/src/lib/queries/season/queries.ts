import { getSeasons, getSingleSeason } from '@/lib/requests/seasons'
import { season } from '@/lib/types/season/seasons'
import { queryOptions } from '@tanstack/react-query'
import { z } from 'zod'
const selectFirstAndLast = (data: z.infer<typeof season>[]) => {
  const firstSeasonObject = data.filter((season) => season.women === false)[
    data.filter((season) => season.women === false).length - 1
  ]
  const lastSeasonObject = data.filter((season) => season.women === false)[0]

  const firstSeason = Number(firstSeasonObject.year)
  const lastSeason = Number(lastSeasonObject.year.split('/')[1])

  return { firstSeason, lastSeason }
}

export const seasonKeys = {
  allSeasons: () => ['allSeasons'] as const,
  singleSeason: (seasonId: number) => ['singleSeason', seasonId] as const,
}

export const seasonQueries = {
  allSeasons: () =>
    queryOptions({ queryKey: seasonKeys.allSeasons(), queryFn: getSeasons }),
  singleSeason: (seasonId: number) =>
    queryOptions({
      queryKey: seasonKeys.singleSeason(seasonId),
      queryFn: () => getSingleSeason(seasonId),
    }),
  firstAndLastSeasons: () =>
    queryOptions({
      queryKey: seasonKeys.allSeasons(),
      queryFn: getSeasons,
      select: selectFirstAndLast,
    }),
}
