import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { playoffQueries } from '@/lib/queries/playoff/queries'
import { useSuspenseQuery } from '@tanstack/react-query'

export const useGetPlayoffData = (seasonId: string) => {
  const { womenContext } = useGenderContext()
  const { data, isLoading, error, isSuccess } = useSuspenseQuery(
    playoffQueries['data'](seasonId)
  )

  const tables = data.tabell.filter((table) => table.women === womenContext)
  const playoffGames = data?.playoffGames.filter(
    (table) => table.women === womenContext
  )
  const final = playoffGames?.filter((games) => games.category === 'final')

  return { isLoading, error, isSuccess, tables, final, playoffGames }
}
