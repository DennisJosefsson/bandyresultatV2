import Loading from '@/components/Components/Common/Loading'
import Map from '@/components/Components/Teams/Map/Map'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/teams/map')({
  component: MapComponent,
  pendingComponent: () => <Loading page="seasonMap" />,
})

function MapComponent() {
  return <Map />
}
