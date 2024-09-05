import { Link, useLoaderData, useSearch } from '@tanstack/react-router'

const SeasonsList = () => {
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const seasons = useLoaderData({
    from: '/_layout/seasons',
    select: (data) => data.rows,
  })
  return (
    <div className="grid grid-cols-1 justify-between gap-x-8 gap-y-2 pt-2 sm:grid-cols-2 lg:grid-cols-3">
      {seasons.map((season) => {
        const seasonYear =
          parseInt(season.year.split('/')[1]) >= 1964
            ? season.year.split('/')[1]
            : season.year

        return (
          <div
            key={season.seasonId}
            className="flex flex-row items-center justify-between bg-muted px-2  py-1 text-sm dark:bg-muted/50 lg:text-base"
          >
            <div className="w-28 font-semibold">{season.year}</div>
            <div className="rounded-md px-2 py-1 text-center  xl:p-0">
              <Link
                to="/season/$seasonId/tables/$table"
                params={{ seasonId: seasonYear, table: 'all' }}
                search={{ women }}
                className="font-medium tabular-nums hover:font-bold hover:text-primary lg:font-normal"
              >
                Tabeller
              </Link>
            </div>
            <div className="rounded-md px-2 py-1 text-center  xl:p-0">
              <Link
                to="/season/$seasonId/games"
                params={{ seasonId: seasonYear }}
                search={{ women }}
                className="font-medium hover:font-bold hover:text-primary lg:font-normal"
              >
                Matcher
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SeasonsList
