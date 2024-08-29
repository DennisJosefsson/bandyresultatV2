import { teamQueries } from '@/lib/queries/teams/queries'
import { CompareFormState } from '@/lib/types/teams/teams'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useLoaderData, useLocation, useSearch } from '@tanstack/react-router'

const baseUrl = import.meta.env.PROD
  ? 'https://bandyresultat.se'
  : 'http://localhost:5173'

export const useCompareResults = (compareObject: CompareFormState) => {
  const { data, error } = useSuspenseQuery(
    teamQueries['compare'](compareObject)
  )
  const href = useLocation().href
  const compareLink = `${baseUrl}${href}`
  return { data, error, compareLink }
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
