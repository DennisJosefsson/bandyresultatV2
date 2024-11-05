import Loading from '@/components/Components/Common/Loading'
import RangeData from '@/components/Components/Season/SeasonIntervalComponents/RangeData'
import { getSubAnimation } from '@/lib/requests/games'
import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/season/$seasonId/interval/$group'
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ params: { seasonId, group }, deps: { women } }) => {
    const data = await getSubAnimation({
      seasonId,
      women,
      group,
    })

    if (
      typeof data === 'object' &&
      'errors' in data &&
      data.errors === 'Inga matcher i gruppen'
    ) {
      throw notFound()
    }

    if (
      typeof data === 'object' &&
      'errors' in data &&
      data.errors === 'Grupp finns ej'
    ) {
      throw redirect({
        to: '/season/$seasonId/interval',
        params: { seasonId },
        search: { women },
      })
    }

    if (data['length'] === 0) {
      throw redirect({
        to: '/season/$seasonId/interval',
        params: { seasonId },
        search: { women },
      })
    }

    return data
  },

  pendingComponent: () => <Loading page="interval" />,
  component: RangeData,
  notFoundComponent: NotFound,
})

function NotFound() {
  const women = Route.useSearch({ select: (s) => s.women })
  return (
    <div className="mt-2 flex flex-row justify-center">
      <p>Ingen data än för {women} den här säsongen.</p>
    </div>
  )
}
