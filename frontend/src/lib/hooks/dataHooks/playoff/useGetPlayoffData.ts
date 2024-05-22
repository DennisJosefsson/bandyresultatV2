import { useSuspenseQuery } from '@tanstack/react-query'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { playoffQueries } from '@/lib/queries/playoff/queries'

export const useGetPlayoffData = (seasonId: string) => {
  const { women } = useGenderContext()
  const { data, isLoading, error, isSuccess } = useSuspenseQuery(
    playoffQueries['data'](seasonId)
  )

  const tables = data.tabell.filter((table) => table.women === women)
  const playoffGames = data?.playoffGames.filter(
    (table) => table.women === women
  )
  const final = playoffGames?.filter((games) => games.category === 'final')

  return { isLoading, error, isSuccess, tables, final, playoffGames }
}
