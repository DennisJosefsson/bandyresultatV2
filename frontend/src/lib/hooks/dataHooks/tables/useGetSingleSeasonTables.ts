import { useSuspenseQuery } from '@tanstack/react-query'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { tableSortFunction } from '@/lib/utils/sortFunction'
import { seasonQueries } from '@/lib/queries/season/queries'

export const useGetSingleSeasonTables = (
  seasonId: string,
  selectedTable: string
) => {
  const { women } = useGenderContext()
  const { data, isLoading, error, isSuccess } = useSuspenseQuery(
    seasonQueries['singleSeasonTables'](seasonId)
  )

  let regTables = isSuccess
    ? data.tabell.filter((table) => table.women === women)
    : []
  switch (selectedTable) {
    case 'all':
      if (isSuccess)
        regTables = data.tabell.filter((table) => table.women === women)

      break
    case 'home':
      if (isSuccess)
        regTables = data.hemmaTabell.filter((table) => table.women === women)
      break
    case 'away':
      if (isSuccess)
        regTables = data.bortaTabell.filter((table) => table.women === women)
      break
    default:
      regTables = []
  }

  const unsortedRegularTables = regTables.filter(
    (table) => table.category === 'regular'
  )
  const unsortedQualificationTables = regTables.filter(
    (table) => table.category === 'qualification'
  )

  const regularTables = tableSortFunction(unsortedRegularTables)
  const qualificationTables = tableSortFunction(unsortedQualificationTables)

  const tableData = {
    unsortedRegularTables,
    regularTables,
    qualificationTables,
  }

  return {
    tableData,
    isLoading,
    error,
  }
}
