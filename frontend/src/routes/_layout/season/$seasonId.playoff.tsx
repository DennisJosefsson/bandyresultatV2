import Loading from '@/components/Components/Common/Loading'
import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
import SeasonPlayoffTables from '@/components/Components/Season/SeasonPlayoffComponents/SeasonPlayoffTables'
import { useGetPlayoffData } from '@/lib/hooks/dataHooks/playoff/useGetPlayoffData'
import { useGetFirstAndLastSeason } from '@/lib/hooks/dataHooks/season/useGetFirstAndLastSeason'
import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'
import { playoffQueries } from '@/lib/queries/playoff/queries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/season/$seasonId/playoff')({
  component: Playoff,
  pendingComponent: Loading,
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(playoffQueries['data'](params.seasonId))
  },
})

function Playoff() {
  const { women } = Route.useSearch()
  const { seasonId } = Route.useParams()
  const { lastSeason } = useGetFirstAndLastSeason()
  const { tables, final, playoffGames } = useGetPlayoffData(seasonId)

  useScrollTo()

  if (women && parseInt(seasonId) < 1973) {
    return <NoWomenSeason />
  }

  return (
    <div>
      {parseInt(seasonId) <= lastSeason && tables && playoffGames && final ? (
        <SeasonPlayoffTables
          tables={tables}
          playoffGames={playoffGames}
          final={final}
          women={women}
          seasonId={seasonId}
          lastSeason={lastSeason.toString()}
        />
      ) : null}
    </div>
  )
}
