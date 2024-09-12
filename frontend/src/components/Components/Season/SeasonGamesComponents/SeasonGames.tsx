import { useGetFirstAndLastSeason } from '@/lib/hooks/dataHooks/season/useGetFirstAndLastSeason'

import { useLoaderData, useParams, useSearch } from '@tanstack/react-router'

import { NoWomenSeason } from '../../Common/NoWomenSeason'
import Games from './Games'

const SeasonGames = () => {
  const seasonId = useParams({
    from: '/_layout/season/$seasonId/games',
    select: (param) => param.seasonId,
  })
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const games = useLoaderData({
    from: '/_layout/season/$seasonId/games',
  })

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
      {seasonId <= lastSeason && (
        <div className="mx-1 mt-2 grid grid-cols-1 lg:grid-cols-2 xl:mx-0 lg:gap-1">
          {games['playedLength'] > 0 ? (
            <Games games={games['played']} title="Spelade" />
          ) : null}
          {games['unplayedLength'] > 0 ? (
            <Games games={games['unplayed']} title="Kommande" />
          ) : null}
        </div>
      )}
    </div>
  )
}

export default SeasonGames
