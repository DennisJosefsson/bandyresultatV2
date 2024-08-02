import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { tableQueries } from '@/lib/queries/tables/queries'
import { tableSortFunction } from '@/lib/utils/sortFunction'
import { useSuspenseQuery } from '@tanstack/react-query'

export const useGetSingleSeasonTables = (
  seasonId: string,
  selectedTable: string
) => {
  const { womenContext } = useGenderContext()
  const { data, isLoading, error } = useSuspenseQuery(
    tableQueries['singleSeasonTables'](seasonId)
  )

  let regTables = data.tabell.filter((table) => table.women === womenContext)

  switch (selectedTable) {
    case 'all':
      regTables = data.tabell.filter((table) => table.women === womenContext)

      break
    case 'home':
      regTables = data.hemmaTabell.filter(
        (table) => table.women === womenContext
      )
      break
    case 'away':
      regTables = data.bortaTabell.filter(
        (table) => table.women === womenContext
      )
      break
    default:
      regTables = data.tabell.filter((table) => table.women === womenContext)
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
