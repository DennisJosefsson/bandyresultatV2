import Loading from '@/components/Components/Common/Loading'
import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
import SeasonPlayoffTables from '@/components/Components/Season/SeasonPlayoffComponents/SeasonPlayoffTables'
import { useGetFirstAndLastSeason } from '@/lib/hooks/dataHooks/season/useGetFirstAndLastSeason'
import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'
import { getSingleSeasonPlayoff } from '@/lib/requests/tables'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/season/$seasonId/playoff')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  component: Playoff,
  pendingComponent: () => <Loading page="seasonPlayoff" />,
  loader: ({ deps, params }) =>
    getSingleSeasonPlayoff({ seasonId: params.seasonId, women: deps.women }),
})

function Playoff() {
  const { women } = Route.useSearch()
  const { seasonId } = Route.useParams()
  const { lastSeason } = useGetFirstAndLastSeason()
  const data = Route.useLoaderData()
  useScrollTo()

  if (women && parseInt(seasonId) < 1973) {
    return <NoWomenSeason />
  }

  return (
    <div>
      {parseInt(seasonId) <= lastSeason ? (
        <SeasonPlayoffTables data={data} lastSeason={lastSeason.toString()} />
      ) : null}
    </div>
  )
}
