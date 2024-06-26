import Loading from '@/components/Components/Common/Loading'
import TeamForm from '@/components/Components/Dashboard/TeamForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/addTeams')({
  component: TeamForm,
  pendingComponent: Loading,
})
