import { useSuspenseQuery } from '@tanstack/react-query'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { tableSortFunction } from '@/lib/utils/sortFunction'
import { tableQueries } from '@/lib/queries/tables/queries'

export const useGetSingleSeasonTables = (
  seasonId: string,
  selectedTable: string
) => {
  const { women } = useGenderContext()
  const { data, isLoading, error } = useSuspenseQuery(
    tableQueries['singleSeasonTables'](seasonId)
  )

  let regTables = data.tabell.filter((table) => table.women === women)

  switch (selectedTable) {
    case 'all':
      regTables = data.tabell.filter((table) => table.women === women)

      break
    case 'home':
      regTables = data.hemmaTabell.filter((table) => table.women === women)
      break
    case 'away':
      regTables = data.bortaTabell.filter((table) => table.women === women)
      break
    default:
      regTables = data.tabell.filter((table) => table.women === women)
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
