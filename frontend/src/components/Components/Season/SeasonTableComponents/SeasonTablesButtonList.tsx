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
    <div>
      <h1 className="mb-2 text-center text-sm font-bold leading-4 sm:text-base md:mb-4 lg:text-xl">
        Serietabell {women ? 'Damer' : 'Herrar'}
      </h1>
      <div className="flex flex-row justify-center">
        <div className="mb-2 grid grid-cols-3 gap-4">
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
      </div>
    </div>
  )
}

export default SeasonTablesButtonList
