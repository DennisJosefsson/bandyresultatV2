import {
  CalendarIcon,
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
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { useMediaQuery } from 'usehooks-ts'

const SeasonTabBar = () => {
  const matches = useMediaQuery('(min-width: 640px)')
  const navigate = useNavigate()
  const { womenContext } = useGenderContext()
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId' })

  const seasonTabBarObject = {
    gender: (
      <Button
        onClick={() => navigate({ search: { women: !womenContext } })}
        size={matches ? 'default' : 'icon'}
      >
        {womenContext ? (
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
            to="/season/$seasonId/games"
            params={{ seasonId: seasonId }}
            search={{ women: womenContext }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'icon'}
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
            to="/season/$seasonId/tables"
            params={{ seasonId: seasonId }}
            search={{ women: womenContext }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'icon'}
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
            to="/season/$seasonId/playoff"
            params={{ seasonId: seasonId }}
            search={{ women: womenContext }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'icon'}
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
            to="/season/$seasonId/development"
            params={{ seasonId: seasonId }}
            search={{ women: womenContext }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'icon'}
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
            to="/season/$seasonId/stats"
            params={{ seasonId: seasonId }}
            search={{ women: womenContext }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'icon'}
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
            to="/season/$seasonId/map"
            params={{ seasonId: seasonId }}
            search={{ women: womenContext }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'icon'}
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
