import { compareTeams } from '@/lib/requests/tables'
import { getMapTeams, getSingleTeam, getTeams } from '@/lib/requests/teams'
import { compareFormState } from '@/lib/types/teams/teams'
import { queryOptions } from '@tanstack/react-query'
import { z } from 'zod'

const teamKeys = {
  all: () => ['teams'] as const,
  map: (women: boolean) =>
    ['mapTeams', { women: women ? 'women' : 'men' }] as const,
  singleTeam: (teamId: string) => ['singleTeam', teamId] as const,
  compare: (compareObject: z.infer<typeof compareFormState>) =>
    ['compare', compareObject] as const,
}

export const teamQueries = {
  all: () =>
    queryOptions({
      queryKey: teamKeys.all(),
      queryFn: getTeams,
    }),
  map: (women: boolean) =>
    queryOptions({
      queryKey: teamKeys.map(women),
      queryFn: () => getMapTeams(women),
      staleTime: 100,
    }),
  singleTeam: (teamId: string) =>
    queryOptions({
      queryKey: teamKeys.singleTeam(teamId),
      queryFn: () => getSingleTeam(teamId),
    }),
  compare: (compareObject: z.infer<typeof compareFormState>) =>
    queryOptions({
      queryKey: teamKeys.compare(compareObject),
      queryFn: () => compareTeams(compareObject),
      staleTime: 100,
    }),
}
