import Loading from '@/components/Components/Common/Loading'
import Record from '@/components/Components/Maraton/Record'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/maraton/records')({
  component: Record,
  pendingComponent: () => <Loading />,
})
