import { Button } from '@/components/ui/button'
import { useGetFirstAndLastSeason } from '@/lib/hooks/dataHooks/season/useGetFirstAndLastSeason'
import { Link, useLocation, useParams, useSearch } from '@tanstack/react-router'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { getParsedRoute } from './utils/utils'

const SeasonHeader = () => {
  const { firstSeason, lastSeason } = useGetFirstAndLastSeason()
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })

  const seasonId = useParams({
    from: '/_layout/season/$seasonId',
    select: (params) => params.seasonId,
  })

  const pathnameEnd = useLocation({
    select: (location) => location.pathname,
  })
    .split('/')
    .slice(3)
    .join('/')

  const parsedRoute = getParsedRoute(pathnameEnd)

  return (
    <div className="pt-2 mb-1 flex gap-10 items-center justify-center sm:mb-2 xl:mb-4">
      <Link
        to={`/season/$seasonId/${parsedRoute}`}
        search={{ women }}
        params={{
          seasonId: seasonId === firstSeason ? lastSeason : seasonId - 1,
        }}
      >
        <Button variant="outline" size="icon" className="h-3 w-3 lg:h-6 lg:w-6">
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="sr-only">Tidigare säsong</span>
        </Button>
      </Link>
      <span className="w-24 text-center font-semibold">
        {seasonId > 1963 ? `${seasonId - 1}/${seasonId}` : `${seasonId}`}
      </span>
      <Link
        to={`/season/$seasonId/${parsedRoute}`}
        search={{ women }}
        params={{
          seasonId: seasonId === lastSeason ? firstSeason : seasonId + 1,
        }}
      >
        <Button variant="outline" size="icon" className="h-3 w-3 lg:h-6 lg:w-6">
          <ArrowRightIcon className="h-4 w-4" />
          <span className="sr-only">Senare säsong</span>
        </Button>
      </Link>
    </div>
  )
}

export default SeasonHeader
