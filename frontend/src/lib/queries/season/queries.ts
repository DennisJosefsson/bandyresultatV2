import { getSeasons } from '@/lib/requests/seasons'
import { queryOptions } from '@tanstack/react-query'

const seasonKeys = {
  all: () => ['allSeasons'] as const,
}

export const allSeasons = queryOptions({
  queryKey: seasonKeys.all(),
  queryFn: getSeasons,
})
