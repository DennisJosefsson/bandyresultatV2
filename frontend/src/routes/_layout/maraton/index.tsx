import Loading from '@/components/Components/Common/Loading'
import Table from '@/components/Components/Maraton/Table'
import { maratonQueries } from '@/lib/queries/maraton/queries'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const validateSearch = z.object({
  table: z.enum(['home', 'away', 'all']).catch('home'),
})

export const Route = createFileRoute('/_layout/maraton/')({
  component: Table,
  pendingComponent: () => <Loading page="maraton" />,
  validateSearch: validateSearch,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(maratonQueries['maraton']()),
})
