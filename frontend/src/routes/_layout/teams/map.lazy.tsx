import Loading from '@/components/Components/Common/Loading'
import { createLazyFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'
const Map = lazy(
  async () => await import('@/components/Components/Teams/Map/Map')
)

export const Route = createLazyFileRoute('/_layout/teams/map')({
  component: MapComponent,
  pendingComponent: () => <Loading page="seasonMap" />,
})

function MapComponent() {
  return <Map />
}
