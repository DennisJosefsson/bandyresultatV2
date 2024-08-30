import { latLngBounds, LatLngBounds, LatLngTuple } from 'leaflet'

import { useLoaderData, useSearch } from '@tanstack/react-router'

export const useMapData = () => {
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const data = useLoaderData({ from: '/_layout/season/$seasonId/map' })
  const seasonObject = data?.find((season) => season.women === women)

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

  return { teams, qualificationTeams, bounds }
}
