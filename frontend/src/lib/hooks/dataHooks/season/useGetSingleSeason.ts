import { useSuspenseQuery } from '@tanstack/react-query'

import { seasonQueries } from '@/lib/queries/season/queries'
import useGenderContext from '../../contextHooks/useGenderContext'

export const useGetSingleSeason = (seasonId: number) => {
  const { womenContext } = useGenderContext()
  const { data, isLoading, error, isSuccess } = useSuspenseQuery(
    seasonQueries['singleSeason'](seasonId)
  )

  const seasonObject = data?.filter(
    (season) => season.women === womenContext
  )[0]

  const seriesInfo = seasonObject?.series

  const seasonTables = seasonObject?.tables

  const tableLength = seasonObject?.tables.length

  const womensSeason = data?.find((season) => season.women === true)

  const seasonData = {
    seriesInfo,
    seasonTables,
    womensSeason,
    tableLength,
  }

  return {
    data,
    seasonData,
    isLoading,
    error,
    isSuccess,
  }
}
