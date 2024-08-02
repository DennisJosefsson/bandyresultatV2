import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { teamQueries } from '@/lib/queries/teams/queries'
import { CompareFormState, compareFormState } from '@/lib/types/teams/teams'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useLocation, useSearch } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import useGetAllSeasons from '../season/useGetAllSeasons'

const baseUrl = import.meta.env.PROD
  ? 'https://bandyresultat.se'
  : 'http://localhost:5173'

const initValues = (women: boolean): CompareFormState => {
  return {
    teamArray: [],
    categoryArray: [
      'qualification',
      'regular',
      'eight',
      'quarter',
      'semi',
      'final',
    ],
    startSeason: women ? '119' : '1',
    endSeason: women ? '171' : '170',
    women: women,
  }
}

export const useCompare = () => {
  const { womenContext } = useGenderContext()
  const compareInitvalues = initValues(womenContext)

  const methods = useForm<CompareFormState>({
    defaultValues: compareInitvalues,
    criteriaMode: 'all',
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(compareFormState),
  })

  return { methods }
}

export const useCompareResults = (compareObject: CompareFormState) => {
  const { data, error } = useSuspenseQuery(
    teamQueries['compare'](compareObject)
  )
  const href = useLocation().href
  const compareLink = `${baseUrl}${href}`
  return { data, error, compareLink }
}

export const useCompareSeasons = () => {
  const { seasons } = useGetAllSeasons()
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
