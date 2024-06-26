import { useNavigate, useLocation } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { TabBarDivided } from '../Common/TabBar'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'

const DashboardTabBar = () => {
  const { women, dispatch } = useGenderContext()
  const navigate = useNavigate({ from: '/dashboard' })
  const pathName = useLocation().pathname

  const dashboardTabBarObject = {
    gender: (
      <Button
        onClick={() => {
          dispatch({ type: 'TOGGLE' })
        }}
      >
        {women ? 'Herrar' : 'Damer'}
      </Button>
    ),
    tabBarArray: [
      {
        tab: (
          <Button
            variant={pathName.endsWith('dashboard') ? 'default' : 'outline'}
            onClick={() => navigate({ to: '/dashboard' })}
          >
            Hem
          </Button>
        ),

        tabName: 'home',
      },
      {
        tab: (
          <Button
            variant={pathName.endsWith('errors') ? 'default' : 'outline'}
            onClick={() => navigate({ to: '/dashboard/errors' })}
          >
            Error
          </Button>
        ),

        tabName: 'error',
      },
      {
        tab: (
          <Button
            variant={pathName.endsWith('addTeams') ? 'default' : 'outline'}
            onClick={() => navigate({ to: '/dashboard/addTeams' })}
          >
            Nytt lag
          </Button>
        ),
        tabName: 'addteams',
        conditional: true,
      },

      {
        tab: (
          <Button
            variant={pathName.endsWith('newSeason') ? 'default' : 'outline'}
            onClick={() => navigate({ to: '/dashboard/newSeason' })}
          >
            Ny säsong
          </Button>
        ),
        tabName: 'newSeason',
      },
      {
        tab: (
          <Button
            variant={pathName.endsWith('seasons') ? 'default' : 'outline'}
            onClick={() => navigate({ to: '/dashboard/seasons' })}
          >
            Säsonger
          </Button>
        ),
        tabName: 'seasons',
      },
    ],
  }

  return <TabBarDivided tabBarObject={dashboardTabBarObject} />
}

export default DashboardTabBar
