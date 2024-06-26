import Loading from '@/components/Components/Common/Loading'
import Errors from '@/components/Components/Dashboard/Errors'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/errors')({
  component: Errors,
  pendingComponent: Loading,
})
