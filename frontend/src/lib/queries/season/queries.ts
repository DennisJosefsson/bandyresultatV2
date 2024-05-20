import { getSeasons, getSingleSeason } from '@/lib/requests/seasons'
import { getSingleSeasonTable } from '@/lib/requests/tables'
import { SeasonObjectType } from '@/lib/types/season/seasons'
import { queryOptions } from '@tanstack/react-query'

const selectFirstAndLast = (data: SeasonObjectType[]) => {
  const firstSeasonObject = data.filter((season) => season.women === false)[
    data.filter((season) => season.women === false).length - 1
  ]
  const lastSeasonObject = data.filter((season) => season.women === false)[0]

  const firstSeason = Number(firstSeasonObject.year)
  const lastSeason = Number(lastSeasonObject.year.split('/')[1])

  return { firstSeason, lastSeason }
}

export const seasonQueries = {
  allSeasons: () =>
    queryOptions({ queryKey: ['allSeasons'], queryFn: getSeasons }),
  singleSeason: (seasonId: string) =>
    queryOptions({
      queryKey: ['singleSeason', seasonId],
      queryFn: () => getSingleSeason(seasonId),
    }),
  firstAndLastSeasons: () =>
    queryOptions({
      queryKey: ['allSeasons'],
      queryFn: getSeasons,
      select: selectFirstAndLast,
    }),
  singleSeasonTables: (seasonId: string) =>
    queryOptions({
      queryKey: ['singleSeasonTable', seasonId],
      queryFn: () => getSingleSeasonTable(seasonId),
    }),
}
