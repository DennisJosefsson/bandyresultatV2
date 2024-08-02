import Loading from '@/components/Components/Common/Loading'
import Map from '@/components/Components/Teams/Map/Map'
//import MemoMap from '@/components/Components/Teams/MemoMap'
import { createLazyFileRoute } from '@tanstack/react-router'
//import { useFormContext } from 'react-hook-form'

export const Route = createLazyFileRoute('/_layout/teams/map')({
  component: MapComponent,
  pendingComponent: Loading,
})

function MapComponent() {
  // const methods = useFormContext()
  // return <MemoMap methods={methods} name="teamArray" />
  return <Map />
}
