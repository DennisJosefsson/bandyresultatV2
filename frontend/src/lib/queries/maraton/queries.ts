import { getStreaks } from '@/lib/requests/games'
import { maratonTabell } from '@/lib/requests/tables'
import { StreakParams } from '@/lib/types/games/streaks'
import { queryOptions } from '@tanstack/react-query'

export const maratonKeys = {
  maraton: () => ['maratonTabell'] as const,
  records: (params: StreakParams) => ['streaks', params] as const,
}

export const maratonQueries = {
  maraton: () =>
    queryOptions({
      queryKey: maratonKeys.maraton(),
      queryFn: maratonTabell,
    }),
  records: (params: StreakParams) =>
    queryOptions({
      queryKey: maratonKeys.records(params),
      queryFn: () => getStreaks(params),
    }),
}
