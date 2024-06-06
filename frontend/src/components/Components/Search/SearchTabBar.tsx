import { Button } from '@/components/ui/button'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
//import { initValues } from '@/lib/hooks/dataHooks/search/useSearchForm'

import { useMediaQuery } from 'usehooks-ts'
import {
  ManIcon,
  WomanIcon,
  SearchIcon,
  QuestionIcon,
} from '../Common/Icons/icons'
import { TabBarDivided } from '../Common/TabBar'
import { useNavigate, useLocation } from '@tanstack/react-router'

// type SearchTabBarProps = {
//   tab: string
//   setTab: Dispatch<SetStateAction<string>>
//   methods: UseFormReturn<SearchParamsObject>
// }

const SearchTabBar = () => {
  const { women, dispatch } = useGenderContext()
  const matches = useMediaQuery('(min-width: 430px)')
  const navigate = useNavigate({ from: '/search' })
  const pathName = useLocation().pathname
  const searchTabBarObject = {
    gender: (
      <Button
        onClick={() => {
          dispatch({ type: 'TOGGLE' })
        }}
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
        onClick={() => navigate({ to: '/search/help' })}
      >
        {matches ? 'Hjälp' : <QuestionIcon />}
      </Button>
    ),
    tabBarArray: [
      {
        tab: (
          <Button
            size={matches ? 'default' : 'icon'}
            variant={pathName.endsWith('search') ? 'default' : 'outline'}
            onClick={() => navigate({ to: '/search' })}
          >
            {matches ? 'Sök' : <SearchIcon />}
          </Button>
        ),
        tabName: 'search',
      },
    ],
  }
  return (
    <>
      <TabBarDivided tabBarObject={searchTabBarObject} />
    </>
  )
}

export default SearchTabBar
