import { getSingleSeasonTable } from '@/lib/requests/tables'
import { queryOptions } from '@tanstack/react-query'

export const tableKeys = {
  singleSeasonTable: (seasonId: string) =>
    ['singleSeasonTable', seasonId] as const,
}

export const tableQueries = {
  singleSeasonTables: (seasonId: string) =>
    queryOptions({
      queryKey: tableKeys.singleSeasonTable(seasonId),
      queryFn: () => getSingleSeasonTable(seasonId),
    }),
}
