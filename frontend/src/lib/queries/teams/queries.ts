import { compareTeams } from '@/lib/requests/tables'
import { getTeams } from '@/lib/requests/teams'
import { CompareFormState } from '@/lib/types/teams/teams'
import { queryOptions } from '@tanstack/react-query'

const teamKeys = {
  all: () => ['teams'] as const,
  compare: (compareObject: CompareFormState) =>
    ['compare', compareObject] as const,
}

export const teamQueries = {
  all: () =>
    queryOptions({
      queryKey: teamKeys.all(),
      queryFn: getTeams,
    }),
  compare: (compareObject: CompareFormState) =>
    queryOptions({
      queryKey: teamKeys.compare(compareObject),
      queryFn: () => compareTeams(compareObject),
    }),
}
