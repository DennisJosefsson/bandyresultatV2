import Loading from '@/components/Components/Common/Loading'
import Record from '@/components/Components/Maraton/Record'
import { maratonQueries } from '@/lib/queries/maraton/queries'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const validateSearch = z.object({
  record: z
    .enum(['generalStats', 'points', 'scored', 'conceded', 'streaks'])
    .catch('generalStats'),
})

export const Route = createFileRoute('/_layout/maraton/records')({
  loaderDeps: ({ search: { record, women } }) => ({ record, women }),
  component: Record,
  pendingComponent: () => <Loading page="records" />,
  validateSearch: validateSearch,
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(
      maratonQueries['records']({ record: deps.record, women: deps.women })
    )
  },
})
