import { TabBarInline } from '@/components/Components/Common/TabBar'
import useGenderContext from '@/lib//hooks/contextHooks/useGenderContext'

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
import { CompareFormState } from '@/lib/types/teams/teams'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { useMediaQuery } from 'usehooks-ts'

const TeamsTabBar = ({ formValues }: { formValues: CompareFormState }) => {
  const matches = useMediaQuery('(min-width: 430px)')
  const { women } = useGenderContext()
  const navigate = useNavigate({ from: '/teams' })
  const pathName = useLocation().pathname

  const teamsTabBarObject = {
    gender: (
      <Button
        onClick={() => {
          navigate({ search: { women: !women } })
        }}
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
          <Link to="/teams" search={formValues}>
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
          <Link to="/teams/map" search={formValues}>
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
          <Link to="/teams/selection" search={formValues}>
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
          <Link to="/teams/compare" search={formValues}>
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'icon'}
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
