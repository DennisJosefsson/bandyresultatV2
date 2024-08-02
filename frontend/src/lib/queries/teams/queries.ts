import { compareTeams } from '@/lib/requests/tables'
import { getSingleTeam, getTeams } from '@/lib/requests/teams'
import { CompareFormState } from '@/lib/types/teams/teams'
import { queryOptions } from '@tanstack/react-query'

const teamKeys = {
  all: () => ['teams'] as const,
  singleTeam: (teamId: string) => ['singleTeam', teamId] as const,
  compare: (compareObject: CompareFormState) =>
    ['compare', compareObject] as const,
}

export const teamQueries = {
  all: () =>
    queryOptions({
      queryKey: teamKeys.all(),
      queryFn: getTeams,
    }),
  singleTeam: (teamId: string) =>
    queryOptions({
      queryKey: teamKeys.singleTeam(teamId),
      queryFn: () => getSingleTeam(teamId),
    }),
  compare: (compareObject: CompareFormState) =>
    queryOptions({
      queryKey: teamKeys.compare(compareObject),
      queryFn: () => compareTeams(compareObject),
      staleTime: 100,
    }),
}
