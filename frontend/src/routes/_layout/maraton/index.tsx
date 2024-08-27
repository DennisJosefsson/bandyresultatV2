import Loading from '@/components/Components/Common/Loading'
import Table from '@/components/Components/Maraton/Table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/maraton/')({
  component: Table,
  pendingComponent: () => <Loading page="maraton" />,
})
