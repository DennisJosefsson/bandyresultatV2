import { Button } from '@/components/ui/button'
import { Link, useParams, useSearch } from '@tanstack/react-router'
import { useMediaQuery } from 'usehooks-ts'

const SeasonTablesButtonList = () => {
  const matches = useMediaQuery('(min-width: 430px)')
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const seasonId = useParams({
    from: '/_layout/season/$seasonId',
    select: (param) => param.seasonId,
  })

  if (seasonId < 1930) return null
  return (
    <div className="my-2 grid w-full grid-cols-3 justify-center gap-4 px-6 sm:px-2 md:flex md:flex-row lg:px-0">
      <Link
        to="/season/$seasonId/tables/$table"
        search={{ women }}
        params={{ table: 'all', seasonId: seasonId }}
        activeOptions={{ includeSearch: false, exact: true }}
      >
        {({ isActive, isTransitioning }) => (
          <Button
            size={matches ? 'sm' : 'xxs'}
            variant={isActive || isTransitioning ? 'default' : 'outline'}
            disabled={isTransitioning}
          >
            Alla
          </Button>
        )}
      </Link>
      <Link
        to="/season/$seasonId/tables/$table"
        search={{ women }}
        params={{ table: 'home', seasonId: seasonId }}
        activeOptions={{ includeSearch: false, exact: true }}
        disabled={[1973, 1974].includes(seasonId)}
      >
        {({ isActive, isTransitioning }) => (
          <Button
            size={matches ? 'sm' : 'textxxs'}
            variant={isActive || isTransitioning ? 'default' : 'outline'}
            disabled={isTransitioning || [1973, 1974].includes(seasonId)}
          >
            Hemma
          </Button>
        )}
      </Link>
      <Link
        to="/season/$seasonId/tables/$table"
        search={{ women }}
        params={{ table: 'away', seasonId: seasonId }}
        activeOptions={{ includeSearch: false, exact: true }}
        disabled={[1973, 1974].includes(seasonId)}
      >
        {({ isActive, isTransitioning }) => (
          <Button
            size={matches ? 'sm' : 'textxxs'}
            variant={isActive || isTransitioning ? 'default' : 'outline'}
            disabled={isTransitioning || [1973, 1974].includes(seasonId)}
          >
            Borta
          </Button>
        )}
      </Link>
    </div>
  )
}

export default SeasonTablesButtonList
