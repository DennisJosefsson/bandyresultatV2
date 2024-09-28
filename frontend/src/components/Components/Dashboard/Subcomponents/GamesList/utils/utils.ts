import { gameFormData } from '@/lib/types/games/gameForm'
import { sortOrder } from '@/lib/utils/constants'
import { z } from 'zod'

export const getGroupArray = (
  series: z.infer<typeof gameFormData>['series']
) => {
  return series
    .map((serie) => {
      return { value: serie.serieGroupCode, label: serie.serieName }
    })
    .sort((a, b) => {
      if (sortOrder.indexOf(a.value) > sortOrder.indexOf(b.value)) {
        return 1
      } else if (sortOrder.indexOf(a.value) < sortOrder.indexOf(b.value)) {
        return -1
      } else {
        return 0
      }
    })
}

export const getTeamSelection = (
  teams: z.infer<typeof gameFormData>['teams']
) => {
  const teamSelection = teams.map((team) => {
    return { value: team.teamId, label: team.name }
  })

  teamSelection.push({ value: 176, label: 'Ej Bestämt' })

  return teamSelection
}
