import { useSuspenseQuery } from '@tanstack/react-query'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { seasonQueries } from '@/lib/queries/season/queries'

export const useGamesSingleSeason = (seasonId: string) => {
  const { women } = useGenderContext()
  const { data, isLoading, error } = useSuspenseQuery(
    seasonQueries['singleSeason'](seasonId)
  )
  const singleSeason = data
  const genderSeason = singleSeason.filter(
    (indSeason) => indSeason.women === women
  )

  const genderSeasonObject = singleSeason.find(
    (season) => season.women === women
  )
  const seriesInfo = genderSeasonObject ? genderSeasonObject.series : []

  return { genderSeason, seriesInfo, isLoading, error }
}
