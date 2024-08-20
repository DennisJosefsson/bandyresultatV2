import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { seasonQueries } from '@/lib/queries/season/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

export const useGamesSingleSeason = () => {
  const { womenContext } = useGenderContext()
  const seasonId = useParams({
    from: '/_layout/season/$seasonId/games',
    select: (param) => param.seasonId,
  })
  const { data, isLoading, error } = useSuspenseQuery(
    seasonQueries['singleSeason'](seasonId)
  )
  const singleSeason = data
  const genderSeason = singleSeason.filter(
    (indSeason) => indSeason.women === womenContext
  )

  const genderSeasonObject = singleSeason.find(
    (season) => season.women === womenContext
  )
  const seriesInfo = genderSeasonObject ? genderSeasonObject.series : []

  return { genderSeason, seriesInfo, isLoading, error }
}
