import Loading from '@/components/Components/Common/Loading'
import DevelopmentData from '@/components/Components/Season/SeasonDevelopmentComponents/DevelopmentData'
import { getSubAnimation } from '@/lib/requests/games'
import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/season/$seasonId/development/$group'
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ params, deps }) => {
    const data = await getSubAnimation({
      seasonId: params.seasonId,
      women: deps.women,
      group: params.group,
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
        to: '/season/$seasonId/development',
        params: { seasonId: params.seasonId },
        search: { women: deps.women },
      })
    }

    if (data['length'] === 0) {
      throw redirect({
        to: '/season/$seasonId/development',
        params: { seasonId: params.seasonId },
        search: { women: deps.women },
      })
    }

    return data
  },

  pendingComponent: () => <Loading page="seasonDevelopment" />,
  component: DevelopmentData,
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
