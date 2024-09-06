import { Button } from '@/components/ui/button'
import { useLocation, useNavigate, useSearch } from '@tanstack/react-router'
import { TabBarDivided } from '../Common/TabBar'

const DashboardTabBar = () => {
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const navigate = useNavigate({ from: '/dashboard' })
  const pathName = useLocation().pathname

  const dashboardTabBarObject = {
    gender: (
      <Button onClick={() => navigate({ search: { women: !women } })}>
        {women ? 'Herrar' : 'Damer'}
      </Button>
    ),
    tabBarArray: [
      {
        tab: (
          <Button
            variant={pathName.endsWith('dashboard') ? 'default' : 'outline'}
            onClick={() => navigate({ to: '/dashboard', search: { women } })}
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
            onClick={() =>
              navigate({ to: '/dashboard/errors', search: { women } })
            }
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
            onClick={() =>
              navigate({ to: '/dashboard/addTeams', search: { women } })
            }
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
            onClick={() =>
              navigate({ to: '/dashboard/newSeason', search: { women } })
            }
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
            onClick={() =>
              navigate({ to: '/dashboard/seasons', search: { women } })
            }
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
