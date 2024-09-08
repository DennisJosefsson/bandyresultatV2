import { latLngBounds, LatLngBounds, LatLngTuple } from 'leaflet'

import { seasonQueries } from '@/lib/queries/season/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams, useSearch } from '@tanstack/react-router'

export const useMapData = () => {
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const seasonId = useParams({
    from: '/_layout/season/$seasonId/map',
    select: (params) => params.seasonId,
  })
  const { data } = useSuspenseQuery(seasonQueries['singleSeason'](seasonId))
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
