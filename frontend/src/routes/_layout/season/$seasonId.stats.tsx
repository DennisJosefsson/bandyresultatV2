import Loading from '@/components/Components/Common/Loading'
import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
import StatsComponent from '@/components/Components/Season/SeasonStatsComponents/StatsComponent'
import { useGetSeasonStats } from '@/lib/hooks/dataHooks/stats/useGetSeasonStats'
import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'
import { statsQueries } from '@/lib/queries/stats/queries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/season/$seasonId/stats')({
  component: Stats,
  pendingComponent: Loading,
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(statsQueries['data'](params.seasonId))
  },
})

function Stats() {
  const { seasonId } = Route.useParams()
  const { data } = useGetSeasonStats(seasonId)

  const { women } = Route.useSearch()

  const gameCount =
    data.gamesCountTotal.find((item) => item.women === women)?.count ?? 0

  useScrollTo()

  if (
    gameCount === 0 ||
    (women && (parseInt(seasonId) === 1973 || parseInt(seasonId) === 1974))
  ) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-foreground md:text-base">
        <p className="mx-10 text-center">Statistik saknas för denna säsong.</p>
      </div>
    )
  }

  if (women && parseInt(seasonId) < 1973) {
    return <NoWomenSeason />
  }

  return <>{data && <StatsComponent />}</>
}
