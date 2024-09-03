import Loading from '@/components/Components/Common/Loading'
import GeneralStats from '@/components/Components/Maraton/RecordSubComponents/GeneralStats'
import { getStreaks } from '@/lib/requests/games'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/maraton/records/')({
  component: GeneralStats,
  pendingComponent: () => <Loading page="generalStats" />,
  loaderDeps: ({ search: { women } }) => ({
    women,
  }),
  loader: ({ deps }) =>
    getStreaks({ record: 'generalStats', women: deps.women }),
})
