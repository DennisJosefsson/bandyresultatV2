import { teamQueries } from '@/lib/queries/teams/queries'
import { compareFormState } from '@/lib/types/teams/compare'
import { getBaseUrl } from '@/lib/utils/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useLoaderData, useLocation, useSearch } from '@tanstack/react-router'
import { z } from 'zod'

const { serverBaseUrl: baseUrl } = getBaseUrl()

export const useCompareResults = (
  compareObject: z.infer<typeof compareFormState>
) => {
  const { data } = useSuspenseQuery(teamQueries['compare'](compareObject))
  const href = useLocation().href
  const compareLink = `${baseUrl}${href}`
  return { data, compareLink }
}

export const useCompareSeasons = () => {
  const seasons = useLoaderData({ from: '/_layout/teams/selection' })
  const { women } = useSearch({
    from: '/_layout/teams',
  })

  const reversedSeasons = [...seasons].sort((a, b) => a.seasonId - b.seasonId)
  const startOptions = reversedSeasons
    .filter((item) => item.women === women)
    .map((season) => {
      return { label: season.year, value: season.seasonId }
    })

  const endOptions = seasons
    .filter((item) => item.women === women)
    .map((season) => {
      return { label: season.year, value: season.seasonId }
    })

  const endOptionsPlaceholder = endOptions[0]?.label

  return { startOptions, endOptions, endOptionsPlaceholder }
}
