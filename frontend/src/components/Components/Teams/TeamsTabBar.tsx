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

const TeamsTabBar = () => {
  const matches = useMediaQuery('(min-width: 430px)')
  const { dispatch, women } = useGenderContext()

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
      <Button size={matches ? 'default' : 'icon'}>
        {matches ? 'Hjälp' : <QuestionIcon />}
      </Button>
    ),
    tabBarArray: [
      {
        tab: (
          <Button size={matches ? 'default' : 'icon'}>
            {matches ? 'Laglista' : <ListIcon />}
          </Button>
        ),
        tabName: 'teams',
      },
      {
        tab: (
          <Button size={matches ? 'default' : 'icon'}>
            {matches ? 'Karta' : <MapIcon />}
          </Button>
        ),
        tabName: 'map',
      },
      {
        tab: (
          <Button size={matches ? 'default' : 'icon'}>
            {matches ? 'Sökval' : <SelectionIcon />}
          </Button>
        ),

        tabName: 'selection',
      },
      {
        tab: (
          <Button size={matches ? 'default' : 'icon'}>
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
