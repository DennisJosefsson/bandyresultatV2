import { TabBarInline } from '@/components/Components/Common/TabBar'

import {
  ListIcon,
  ManIcon,
  MapIcon,
  QuestionIcon,
  SearchIcon,
  SelectionIcon,
  WomanIcon,
} from '@/components/Components/Common/Icons/icons'
import { Button } from '@/components/ui/button'
import {
  Link,
  useLocation,
  useNavigate,
  useSearch,
} from '@tanstack/react-router'
import { useMediaQuery } from 'usehooks-ts'

const TeamsTabBar = () => {
  const matches = useMediaQuery('(min-width: 430px)')
  const search = useSearch({ from: '/_layout/teams' })
  const teamArray = useSearch({
    from: '/_layout/teams',
    select: (search) => search.teamArray,
  })
  const navigate = useNavigate({ from: '/teams' })
  const pathName = useLocation().pathname

  const disabled = teamArray ? Boolean(teamArray.length < 2) : true

  const teamsTabBarObject = {
    gender: (
      <Button
        onClick={() => {
          navigate({ search: { women: !search.women } })
        }}
        size={matches ? 'default' : 'icon'}
      >
        {search.women ? (
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
    help: (
      <Button
        size={matches ? 'default' : 'icon'}
        variant={pathName.endsWith('help') ? 'default' : 'outline'}
      >
        {matches ? 'Hjälp' : <QuestionIcon />}
      </Button>
    ),
    tabBarArray: [
      {
        tab: (
          <Link to="/teams" search={search}>
            {({ isActive }) => {
              return (
                <Button
                  variant={
                    isActive && pathName.endsWith('teams')
                      ? 'default'
                      : 'outline'
                  }
                  size={matches ? 'default' : 'icon'}
                >
                  {matches ? 'Laglista' : <ListIcon />}
                </Button>
              )
            }}
          </Link>
        ),
        tabName: 'teams',
      },
      {
        tab: (
          <Link to="/teams/map" search={search}>
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
      {
        tab: (
          <Link to="/teams/selection" search={search}>
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'icon'}
                >
                  {matches ? 'Sökval' : <SelectionIcon />}
                </Button>
              )
            }}
          </Link>
        ),

        tabName: 'selection',
      },
      {
        tab: (
          <Link to="/teams/compare" search={search} disabled={disabled}>
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'icon'}
                  disabled={disabled}
                >
                  {matches ? 'Jämför' : <SearchIcon />}
                </Button>
              )
            }}
          </Link>
        ),
        tabName: 'compare',
      },
    ],
  }
  return (
    <>
      <TabBarInline tabBarObject={teamsTabBarObject} />
    </>
  )
}

export default TeamsTabBar
