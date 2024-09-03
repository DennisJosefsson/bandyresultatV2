import {
  ListIcon,
  ManIcon,
  QuestionIcon,
  StatsIcon,
  WomanIcon,
} from '@/components/Components/Common/Icons/icons'
import { TabBarDivided } from '@/components/Components/Common/TabBar'
import { Button } from '@/components/ui/button'
import {
  Link,
  useLocation,
  useNavigate,
  useSearch,
} from '@tanstack/react-router'
import { useMediaQuery } from 'usehooks-ts'

const re = /all|home|away/

const MaratonTabBar = () => {
  const navigate = useNavigate()
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const location = useLocation().pathname

  const matches = useMediaQuery('(min-width: 430px)')
  const maratonTabBarObject = {
    gender: (
      <Button
        onClick={() => {
          navigate({ search: { women: !women } })
        }}
        variant="default"
        size={matches ? 'default' : 'xs'}
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
      <Link
        to="/maraton/help"
        search={{ women: women }}
        activeOptions={{ includeSearch: false }}
      >
        {({ isActive }) => {
          return (
            <Button
              variant={isActive ? 'default' : 'outline'}
              size={matches ? 'default' : 'xs'}
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
          <Link
            to="/maraton/table/$table"
            params={{ table: 'all' }}
            search={{ women: women }}
          >
            <Button
              variant={location.match(re) ? 'default' : 'outline'}
              size={matches ? 'default' : 'xs'}
            >
              {matches ? 'Maratontabeller' : <ListIcon />}
            </Button>
          </Link>
        ),
        tabName: 'maraton',
      },
      {
        tab: (
          <Link
            to="/maraton/records"
            search={{ women: women }}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'xs'}
                >
                  {matches ? 'Rekord' : <StatsIcon />}
                </Button>
              )
            }}
          </Link>
        ),
        tabName: 'records',
      },
    ],
  }
  return (
    <>
      <TabBarDivided tabBarObject={maratonTabBarObject} />
    </>
  )
}

export default MaratonTabBar
