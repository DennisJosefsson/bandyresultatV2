import Loading from '@/components/Components/Common/Loading'
import Team from '@/components/Components/SingleTeam/Team'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/team/$teamId/')({
  component: Team,
  pendingComponent: Loading,
})
