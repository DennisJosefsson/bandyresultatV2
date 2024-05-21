import { createFileRoute } from '@tanstack/react-router'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { qualIcon } from '@/components/Components/Common/Icons/leafletMarker'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { useMapData } from '@/lib/hooks/dataHooks/map/useMapData'
import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
import Loading from '@/components/Components/Common/Loading'
import { seasonQueries } from '@/lib/queries/season/queries'

export const Route = createFileRoute('/_layout/season/$seasonId/map')({
  component: Map,
  pendingComponent: Loading,
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(
      seasonQueries['singleSeason'](params.seasonId)
    )
  },
})

function Map() {
  const { seasonId } = Route.useParams()
  const { teams, qualificationTeams, bounds } = useMapData(seasonId)
  const { women } = useGenderContext()
  if (women && parseInt(seasonId) < 1973) {
    return <NoWomenSeason />
  }

  return (
    <div>
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
