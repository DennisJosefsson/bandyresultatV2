import { maratonQueries } from '@/lib/queries/maraton/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { useState } from 'react'

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

export const useGetRecordData = () => {
  const { record, women } = useSearch({ from: '/_layout/maraton/records' })

  const [title, setTitle] = useState<string>(titles[record])
  const { data, isLoading, isPending, error, isSuccess } = useSuspenseQuery(
    maratonQueries['records']({
      record: record,
      women: women,
    })
  )

  return {
    data,
    title,
    record,
    setTitle,
    isLoading,
    isPending,
    error,
    isSuccess,
  }
}
