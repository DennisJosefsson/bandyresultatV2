import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { CompareFormState, compareFormState } from '@/lib/types/teams/teams'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import { compareTeams } from '@/lib/requests/tables'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import useGetAllSeasons from '../season/useGetAllSeasons'
import { teamQueries } from '@/lib/queries/teams/queries'
import { useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

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
  const { women } = useGenderContext()
  const compareInitvalues = initValues(women)

  const methods = useForm<CompareFormState>({
    defaultValues: compareInitvalues,
    criteriaMode: 'all',
    mode: 'onTouched',
    resolver: zodResolver(compareFormState),
  })

  const mutation = useMutation({
    mutationFn: compareTeams,
  })

  const baseUrl = import.meta.env.PROD
    ? 'https://bandyresultat.se'
    : 'http://localhost:5173'
  const compareLink = `${baseUrl}/teams?link=${mutation.data?.link[0].linkName}`

  return { methods, mutation, compareLink }
}

export const useCompareResults = (compareObject: CompareFormState) => {
  const [linkLoaded, setLinkLoaded] = useState(false)
  const methods = useFormContext()
  const { data } = useSuspenseQuery(teamQueries['compare'](compareObject))

  const href = useLocation().href

  const compareLink = `${baseUrl}${href}`

  useEffect(() => {
    if (!linkLoaded) {
      methods.reset(compareObject)
      setLinkLoaded(true)
    }
  }, [compareObject, linkLoaded, methods])

  return { data, compareLink }
}

export const useCompareSeasons = () => {
  const { seasons } = useGetAllSeasons()

  const reversedSeasons = [...seasons].sort((a, b) => a.seasonId - b.seasonId)
  const startOptions = reversedSeasons.map((season) => {
    return { label: season.year, value: season.seasonId }
  })

  const endOptions = seasons.map((season) => {
    return { label: season.year, value: season.seasonId }
  })

  const endOptionsPlaceholder = endOptions[0]?.label

  return { startOptions, endOptions, endOptionsPlaceholder }
}
