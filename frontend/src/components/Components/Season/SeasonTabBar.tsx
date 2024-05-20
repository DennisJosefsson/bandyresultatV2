import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { TabBarInline } from '@/components/Components/Common/TabBar'
import { useMediaQuery } from 'usehooks-ts'
import { Button } from '@/components/ui/button'
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
import { useNavigate, useLocation } from '@tanstack/react-router'

const SeasonTabBar = () => {
  const matches = useMediaQuery('(min-width: 640px)')
  const { dispatch, women } = useGenderContext()
  const navigate = useNavigate({ from: '/season/$seasonId' })
  const pathName = useLocation().pathname
  const seasonTabBarObject = {
    gender: (
      <Button
        onClick={() => dispatch({ type: 'TOGGLE' })}
        size={matches ? 'default' : 'icon'}
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
          <Button
            variant={pathName.endsWith('games') ? 'default' : 'outline'}
            onClick={() => navigate({ to: '/season/$seasonId/games' })}
            size={matches ? 'default' : 'icon'}
          >
            {matches ? 'Matcher' : <CalendarIcon />}
          </Button>
        ),

        tabName: 'games',
      },
      {
        tab: (
          <Button
            variant={pathName.endsWith('tables') ? 'default' : 'outline'}
            onClick={() => navigate({ to: '/season/$seasonId/tables' })}
            size={matches ? 'default' : 'icon'}
          >
            {matches ? 'Tabell' : <ListIcon />}
          </Button>
        ),

        tabName: 'tables',
      },
      {
        tab: (
          <Button
            variant={pathName.endsWith('playoff') ? 'default' : 'outline'}
            onClick={() => navigate({ to: '/season/$seasonId/playoff' })}
            size={matches ? 'default' : 'icon'}
          >
            {matches ? 'Slutspel' : <TrophyIcon />}
          </Button>
        ),

        tabName: 'playoff',
      },
      {
        tab: (
          <Button
            variant={pathName.endsWith('development') ? 'default' : 'outline'}
            onClick={() => navigate({ to: '/season/$seasonId/development' })}
            size={matches ? 'default' : 'icon'}
          >
            {matches ? 'Utveckling' : <DevIcon />}
          </Button>
        ),

        tabName: 'roundForRound',
      },
      {
        tab: (
          <Button
            variant={pathName.endsWith('stats') ? 'default' : 'outline'}
            onClick={() => navigate({ to: '/season/$seasonId/stats' })}
            size={matches ? 'default' : 'icon'}
          >
            {matches ? 'Statistik' : <StatsIcon />}
          </Button>
        ),

        tabName: 'stats',
      },
      {
        tab: (
          <Button
            variant={pathName.endsWith('map') ? 'default' : 'outline'}
            onClick={() => navigate({ to: '/season/$seasonId/map' })}
            size={matches ? 'default' : 'icon'}
          >
            {matches ? 'Karta' : <MapIcon />}
          </Button>
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
