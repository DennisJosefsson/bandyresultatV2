import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { playoffQueries } from '@/lib/queries/playoff/queries'
import { useSuspenseQuery } from '@tanstack/react-query'

export const useGetPlayoffData = (seasonId: string) => {
  const { womenContext } = useGenderContext()
  const { data, isLoading, error, isSuccess } = useSuspenseQuery(
    playoffQueries['data'](seasonId, womenContext)
  )

  return { isLoading, error, isSuccess, data }
}
