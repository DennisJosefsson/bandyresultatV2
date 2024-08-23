import {
  ListIcon,
  ManIcon,
  QuestionIcon,
  StatsIcon,
  WomanIcon,
} from '@/components/Components/Common/Icons/icons'
import { TabBarDivided } from '@/components/Components/Common/TabBar'
import { Button } from '@/components/ui/button'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { Link, useNavigate } from '@tanstack/react-router'
import { useMediaQuery } from 'usehooks-ts'

const MaratonTabBar = () => {
  const navigate = useNavigate()
  const { womenContext } = useGenderContext()
  const matches = useMediaQuery('(min-width: 430px)')
  const maratonTabBarObject = {
    gender: (
      <Button
        onClick={() => {
          navigate({ search: (prev) => ({ ...prev, women: !womenContext }) })
        }}
        variant="default"
        size={matches ? 'default' : 'xs'}
      >
        {womenContext ? (
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
        search={{ women: womenContext }}
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
            to="/maraton"
            search={{ table: 'all', women: womenContext }}
            activeOptions={{ includeSearch: false, exact: true }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'xs'}
                >
                  {matches ? 'Maratontabeller' : <ListIcon />}
                </Button>
              )
            }}
          </Link>
        ),
        tabName: 'maraton',
      },
      {
        tab: (
          <Link
            to="/maraton/records"
            search={{ record: 'generalStats', women: womenContext }}
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
