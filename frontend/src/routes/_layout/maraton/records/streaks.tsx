import Loading from '@/components/Components/Common/Loading'
import Streaks from '@/components/Components/Maraton/RecordSubComponents/Streaks'
import { getStreaks } from '@/lib/requests/games'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/maraton/records/streaks')({
  component: Streaks,
  pendingComponent: () => <Loading page="streaks" />,
  loaderDeps: ({ search: { women } }) => ({
    women,
  }),
  loader: ({ deps }) => getStreaks({ record: 'streaks', women: deps.women }),
})
