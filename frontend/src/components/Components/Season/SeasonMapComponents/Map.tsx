import { useMapData } from '@/lib/hooks/dataHooks/map/useMapData'
import { getRouteApi } from '@tanstack/react-router'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { qualIcon } from '../../Common/Icons/leafletMarker'
import { NoWomenSeason } from '../../Common/NoWomenSeason'

const route = getRouteApi('/_layout/season/$seasonId/map')

const Map = () => {
  const { seasonId } = route.useParams()
  const { teams, qualificationTeams, bounds } = useMapData()
  const { women } = route.useSearch()

  if (women && seasonId < 1973) {
    return <NoWomenSeason />
  }

  return (
    <div className="mx-auto">
      {teams && qualificationTeams && (
        <div
          id="map"
          className="h-[400px] w-screen max-w-[280px] p-2 xs:max-w-[360px] sm:max-w-xl xl:max-w-4xl"
        >
          <MapContainer
            bounds={bounds}
            center={[62, 15]}
            zoom={4}
            scrollWheelZoom={true}
            className="h-[400px] sm:h-[600px]"
            key={seasonId}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup chunkedLoading>
              {teams.map((team) => {
                const position = [team.lat, team.long] as LatLngExpression
                return (
                  <Marker key={team.teamId} position={position}>
                    <Popup>{team.name}</Popup>
                  </Marker>
                )
              })}
              {qualificationTeams.map((team) => {
                const position = [team.lat, team.long] as LatLngExpression
                return (
                  <Marker key={team.teamId} position={position} icon={qualIcon}>
                    <Popup>{team.name}</Popup>
                  </Marker>
                )
              })}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      )}
    </div>
  )
}

export default Map
