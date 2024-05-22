import { getTeams } from '@/lib/requests/teams'
import { queryOptions } from '@tanstack/react-query'

const teamKeys = {
  all: () => ['teams'] as const,
}

export const teamQueries = {
  all: () =>
    queryOptions({
      queryKey: teamKeys.all(),
      queryFn: getTeams,
    }),
}
