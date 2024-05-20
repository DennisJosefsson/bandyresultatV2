import { useSuspenseQuery } from '@tanstack/react-query'
import { seasonQueries } from '@/lib/queries/season/queries'

const useGetAllSeasons = () => {
  const {
    data: seasons,
    isLoading,
    error,
  } = useSuspenseQuery(seasonQueries['allSeasons']())

  return { seasons, isLoading, error }
}

export default useGetAllSeasons
