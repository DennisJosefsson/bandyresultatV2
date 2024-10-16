import { useGetFirstAndLastSeason } from '@/lib/hooks/dataHooks/season/useGetFirstAndLastSeason'

import { getRouteApi, Link } from '@tanstack/react-router'

import { NoWomenSeason } from '../../Common/NoWomenSeason'
import SubGames from './SubGames'

const route = getRouteApi('/_layout/season/$seasonId/games/sub/$group')

const SubSeasonGames = () => {
  const seasonId = route.useParams({
    select: (param) => param.seasonId,
  })
  const women = route.useSearch({
    select: (search) => search.women,
  })
  const games = route.useLoaderData()

  const { lastSeason } = useGetFirstAndLastSeason()

  if (women && seasonId < 1973) {
    return <NoWomenSeason />
  }

  if (games['playedLength'] + games['unplayedLength'] === 0) {
    return (
      <div className="flex flex-row justify-center mt-2 font-semibold">
        Inga matcher än denna säsong.
      </div>
    )
  }
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col font-inter text-foreground">
      <div className="mb-2">
        <Link
          from="/season/$seasonId/games/sub/$group"
          to="/season/$seasonId/games"
          params={(prev) => ({ seasonId: prev.seasonId })}
          search={(prev) => ({ ...prev })}
        >
          <span className="text-[10px] md:text-sm">Högsta divisionen</span>
        </Link>
      </div>
      {seasonId <= lastSeason && (
        <div className="mx-1 mt-2 grid grid-cols-1 lg:grid-cols-2 xl:mx-0 lg:gap-1">
          {games['playedLength'] > 0 ? (
            <SubGames games={games['played']} title="Spelade" />
          ) : null}
          {games['unplayedLength'] > 0 ? (
            <SubGames games={games['unplayed']} title="Kommande" />
          ) : null}
        </div>
      )}
    </div>
  )
}

export default SubSeasonGames
