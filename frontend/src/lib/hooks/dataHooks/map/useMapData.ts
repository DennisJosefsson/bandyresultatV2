import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'

import { latLngBounds, LatLngBounds, LatLngTuple } from 'leaflet'
import { useGetSingleSeason } from '../season/useGetSingleSeason'

export const useMapData = (seasonId: string) => {
  const { womenContext } = useGenderContext()
  const { data, error, isLoading, isSuccess } = useGetSingleSeason(seasonId)
  const seasonObject = data?.find((season) => season.women === womenContext)

  const teams = seasonObject?.teams.filter(
    (team) => team.teamseason.qualification !== true
  )

  const qualificationTeams = seasonObject?.teams.filter(
    (team) => team.teamseason.qualification === true
  )

  const latLongArray = seasonObject?.teams.map((team) => {
    return [team.lat, team.long]
  }) as LatLngTuple[]

  const bounds = latLngBounds(latLongArray) as LatLngBounds

  return { teams, qualificationTeams, bounds, error, isLoading, isSuccess }
}
