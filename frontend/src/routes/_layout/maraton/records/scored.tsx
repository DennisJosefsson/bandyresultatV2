import Loading from '@/components/Components/Common/Loading'
import PointsGoals from '@/components/Components/Maraton/RecordSubComponents/PointsGoals'
import { getStreaks } from '@/lib/requests/games'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/maraton/records/scored')({
  component: Scored,
  pendingComponent: () => <Loading page="pointsgoals" />,
  loaderDeps: ({ search: { women } }) => ({
    women,
  }),
  loader: ({ deps }) => getStreaks({ record: 'scored', women: deps.women }),
})

function Scored() {
  const data = Route.useLoaderData()
  return <PointsGoals data={data} />
}
