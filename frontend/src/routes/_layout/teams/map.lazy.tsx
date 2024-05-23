import Loading from '@/components/Components/Common/Loading'
import MemoMap from '@/components/Components/Teams/MemoMap'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useFormContext } from 'react-hook-form'

export const Route = createLazyFileRoute('/_layout/teams/map')({
  component: Map,
  pendingComponent: Loading,
})

function Map() {
  const methods = useFormContext()
  return <MemoMap methods={methods} name="teamArray" />
}
