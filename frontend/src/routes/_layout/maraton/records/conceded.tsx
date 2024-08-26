import Loading from '@/components/Components/Common/Loading'
import PointsGoals from '@/components/Components/Maraton/RecordSubComponents/PointsGoals'
import { getStreaks } from '@/lib/requests/games'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/maraton/records/conceded')({
  component: Conceded,
  pendingComponent: Loading,
  loaderDeps: ({ search: { women } }) => ({
    women,
  }),
  loader: ({ deps }) => getStreaks({ record: 'conceded', women: deps.women }),
})

function Conceded() {
  const data = Route.useLoaderData()
  return <PointsGoals data={data} />
}
