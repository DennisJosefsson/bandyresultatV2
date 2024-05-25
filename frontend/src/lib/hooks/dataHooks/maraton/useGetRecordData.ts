import { useState, useEffect } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { maratonQueries } from '@/lib/queries/maraton/queries'
import useGenderContext from '../../contextHooks/useGenderContext'

type Title = {
  [key: string]: string
}

const titles: Title = {
  points: 'Poäng Elitserien',
  conceded: 'Insläppta mål Elitserien',
  scored: 'Gjorda mål Elitserien',
  generalStats: 'Statistik',
  streaks: 'Rekordsviter',
}

const fields = ['points', 'conceded', 'scored', 'generalStats', 'streaks']

export const useGetRecordData = () => {
  const { record, women } = useSearch({ from: '/_layout/maraton' })
  const navigate = useNavigate()
  const { women: currentWomen, dispatch } = useGenderContext()
  const [params, setParams] = useState({
    record: record && fields.includes(record) ? record : 'generalStats',
    women: women,
  })
  const [title, setTitle] = useState<string>(
    record && fields.includes(record) ? titles[record] : 'Statistik'
  )
  const { data, isLoading, error, isSuccess } = useSuspenseQuery(
    maratonQueries['records'](params)
  )

  useEffect(() => {
    if (currentWomen !== women) {
      dispatch({ type: 'SET', payload: women })
      navigate({ search: (prev) => ({ ...prev, women: women }) })
    }
    setParams((params) => ({ ...params, women: women }))
  }, [women, currentWomen, navigate, dispatch])
  return {
    data,
    title,
    params,
    record,
    setParams,
    setTitle,
    isLoading,
    error,
    isSuccess,
  }
}
