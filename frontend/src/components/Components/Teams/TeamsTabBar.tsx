import useGenderContext from '@/lib//hooks/contextHooks/useGenderContext'
import { TabBarInline } from '@/components/Components/Common/TabBar'

import { Button } from '@/components/ui/button'
import {
  QuestionIcon,
  ListIcon,
  SearchIcon,
  WomanIcon,
  ManIcon,
  MapIcon,
  SelectionIcon,
} from '@/components/Components/Common/Icons/icons'
import { useMediaQuery } from 'usehooks-ts'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { CompareFormState } from '@/lib/types/teams/teams'

const TeamsTabBar = ({ formValues }: { formValues: CompareFormState }) => {
  const matches = useMediaQuery('(min-width: 430px)')
  const { dispatch, women } = useGenderContext()
  const navigate = useNavigate({ from: '/teams' })
  const pathName = useLocation().pathname

  const teamsTabBarObject = {
    gender: (
      <Button
        onClick={() => {
          dispatch({ type: 'TOGGLE' })
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
          <Button
            variant={pathName.endsWith('teams') ? 'default' : 'outline'}
            size={matches ? 'default' : 'icon'}
            onClick={() => navigate({ to: '/teams' })}
          >
            {matches ? 'Laglista' : <ListIcon />}
          </Button>
        ),
        tabName: 'teams',
      },
      {
        tab: (
          <Button
            variant={pathName.endsWith('map') ? 'default' : 'outline'}
            size={matches ? 'default' : 'icon'}
            onClick={() => navigate({ to: '/teams/map' })}
          >
            {matches ? 'Karta' : <MapIcon />}
          </Button>
        ),
        tabName: 'map',
      },
      {
        tab: (
          <Button
            size={matches ? 'default' : 'icon'}
            onClick={() => navigate({ to: '/teams/selection' })}
            variant={pathName.endsWith('selection') ? 'default' : 'outline'}
          >
            {matches ? 'Sökval' : <SelectionIcon />}
          </Button>
        ),

        tabName: 'selection',
      },
      {
        tab: (
          <Button
            size={matches ? 'default' : 'icon'}
            variant={pathName.endsWith('compare') ? 'default' : 'outline'}
            onClick={() =>
              navigate({ to: '/teams/compare', search: formValues })
            }
          >
            {matches ? 'Jämför' : <SearchIcon />}
          </Button>
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
