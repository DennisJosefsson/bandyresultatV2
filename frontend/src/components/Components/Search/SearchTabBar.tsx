import { Button } from '@/components/ui/button'
import {
  Link,
  useLocation,
  useNavigate,
  useSearch,
} from '@tanstack/react-router'
import { useMediaQuery } from 'usehooks-ts'
import {
  ManIcon,
  QuestionIcon,
  SearchIcon,
  WomanIcon,
} from '../Common/Icons/icons'
import { TabBarDivided } from '../Common/TabBar'

const SearchTabBar = () => {
  const search = useSearch({ from: '/_layout/search' })
  const matches = useMediaQuery('(min-width: 430px)')
  const navigate = useNavigate({ from: '/search' })
  const pathName = useLocation().pathname
  const searchTabBarObject = {
    gender: (
      <Button
        onClick={() => {
          navigate({ search: { women: !search.women } })
        }}
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
      <Link to="/search/help" search={search}>
        {({ isActive }) => {
          return (
            <Button
              variant={
                isActive && pathName.endsWith('help') ? 'default' : 'outline'
              }
              size={matches ? 'default' : 'icon'}
            >
              {matches ? 'Hjälp' : <QuestionIcon />}
            </Button>
          )
        }}
      </Link>
    ),
    tabBarArray: [
      {
        tab: (
          <Link to="/search" search={search}>
            {({ isActive }) => {
              return (
                <Button
                  variant={
                    isActive && pathName.endsWith('search')
                      ? 'default'
                      : 'outline'
                  }
                  size={matches ? 'default' : 'icon'}
                >
                  {matches ? 'Sök' : <SearchIcon />}
                </Button>
              )
            }}
          </Link>
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
