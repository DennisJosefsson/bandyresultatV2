import {
  CalendarIcon,
  ChevronsLeftRightEllipsis,
  DevIcon,
  ListIcon,
  ManIcon,
  MapIcon,
  StatsIcon,
  TrophyIcon,
  WomanIcon,
} from '@/components/Components/Common/Icons/icons'
import { TabBarInline } from '@/components/Components/Common/TabBar'
import { Button } from '@/components/ui/button'
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearch,
} from '@tanstack/react-router'

import { useMediaQuery } from 'usehooks-ts'

const SeasonTabBar = () => {
  const matches = useMediaQuery('(min-width: 840px)')
  const navigate = useNavigate({ from: '/season/$seasonId' })
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId' })
  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  const seasonTabBarObject = {
    gender: (
      <Button
        onClick={() =>
          navigate({
            to: pathname.includes('/tables/sub/')
              ? '/season/$seasonId/tables/sub'
              : pathname.includes('/games/sub/')
                ? '/season/$seasonId/games/sub'
                : undefined,
            search: { women: !women },
          })
        }
        size={matches ? 'default' : 'xs'}
      >
        {women ? (
          matches ? (
            'Herrar'
          ) : (
            <ManIcon />
          )
        ) : matches ? (
          'Damer'
        ) : (
          <WomanIcon />
        )}
      </Button>
    ),
    tabBarArray: [
      {
        tab: (
          <Link
            from="/season/$seasonId"
            to="/season/$seasonId/games"
            params={{ seasonId: seasonId }}
            search={(prev) => ({ ...prev })}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'xs'}
                >
                  {matches ? 'Matcher' : <CalendarIcon />}
                </Button>
              )
            }}
          </Link>
        ),

        tabName: 'games',
      },
      {
        tab: (
          <Link
            from="/season/$seasonId"
            to="/season/$seasonId/tables"
            params={{ seasonId: seasonId }}
            search={(prev) => ({ ...prev })}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'xs'}
                >
                  {matches ? 'Tabell' : <ListIcon />}
                </Button>
              )
            }}
          </Link>
        ),

        tabName: 'tables',
      },
      {
        tab: (
          <Link
            from="/season/$seasonId"
            to="/season/$seasonId/playoff"
            params={{ seasonId: seasonId }}
            search={(prev) => ({ ...prev })}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'xs'}
                >
                  {matches ? 'Slutspel' : <TrophyIcon />}
                </Button>
              )
            }}
          </Link>
        ),

        tabName: 'playoff',
      },
      {
        tab: (
          <Link
            from="/season/$seasonId"
            to="/season/$seasonId/development"
            params={{ seasonId: seasonId }}
            search={(prev) => ({ ...prev })}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'xs'}
                >
                  {matches ? 'Utveckling' : <DevIcon />}
                </Button>
              )
            }}
          </Link>
        ),

        tabName: 'development',
      },
      {
        tab: (
          <Link
            from="/season/$seasonId"
            to="/season/$seasonId/interval"
            params={{ seasonId: seasonId }}
            search={(prev) => ({ ...prev })}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'xs'}
                >
                  {matches ? 'Intervall' : <ChevronsLeftRightEllipsis />}
                </Button>
              )
            }}
          </Link>
        ),

        tabName: 'interval',
      },
      {
        tab: (
          <Link
            from="/season/$seasonId"
            to="/season/$seasonId/stats"
            params={{ seasonId: seasonId }}
            search={(prev) => ({ ...prev })}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'xs'}
                >
                  {matches ? 'Statistik' : <StatsIcon />}
                </Button>
              )
            }}
          </Link>
        ),

        tabName: 'stats',
      },
      {
        tab: (
          <Link
            from="/season/$seasonId"
            to="/season/$seasonId/map"
            params={{ seasonId: seasonId }}
            search={(prev) => ({ ...prev })}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'xs'}
                >
                  {matches ? 'Karta' : <MapIcon />}
                </Button>
              )
            }}
          </Link>
        ),
        tabName: 'map',
      },
    ],
  }
  return (
    <>
      <TabBarInline tabBarObject={seasonTabBarObject} />
    </>
  )
}

export default SeasonTabBar
