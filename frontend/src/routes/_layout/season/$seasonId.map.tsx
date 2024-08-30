import { qualIcon } from '@/components/Components/Common/Icons/leafletMarker'
import Loading from '@/components/Components/Common/Loading'
import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
import { useMapData } from '@/lib/hooks/dataHooks/map/useMapData'

import { getSingleSeason } from '@/lib/requests/seasons'
import { createFileRoute } from '@tanstack/react-router'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'

export const Route = createFileRoute('/_layout/season/$seasonId/map')({
  component: Map,
  pendingComponent: () => <Loading page="seasonMap" />,
  loader: ({ params }) => getSingleSeason(params.seasonId),
})

function Map() {
  const { seasonId } = Route.useParams()
  const { teams, qualificationTeams, bounds } = useMapData()
  const { women } = Route.useSearch()

  if (women && parseInt(seasonId) < 1973) {
    return <NoWomenSeason />
  }

  return (
    <div className="mx-auto">
      {teams && qualificationTeams && (
        <div
          id="map"
          className="h-[400px] w-screen max-w-[280px] p-2 xs:max-w-[360px] sm:max-w-xl"
        >
          <MapContainer
            bounds={bounds}
            center={[62, 15]}
            zoom={4}
            scrollWheelZoom={true}
            className="h-[400px]"
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
