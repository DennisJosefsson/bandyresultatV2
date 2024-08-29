import { getSingleSeasonTable } from '@/lib/requests/tables'
import { queryOptions } from '@tanstack/react-query'

export const tableKeys = {
  singleSeasonTable: (seasonId: string, table: string, women: boolean) =>
    ['singleSeasonTable', [seasonId, table, women]] as const,
}

export const tableQueries = {
  singleSeasonTables: (seasonId: string, table: string, women: boolean) =>
    queryOptions({
      queryKey: tableKeys.singleSeasonTable(seasonId, table, women),
      queryFn: () => getSingleSeasonTable({ seasonId, table, women }),
    }),
}
