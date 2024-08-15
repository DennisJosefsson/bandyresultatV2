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
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useMediaQuery } from 'usehooks-ts'

const MaratonTabBar = () => {
  const { tab } = useSearch({ from: '/_layout/maraton' })
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
      <Button
        onClick={() =>
          navigate({ search: { tab: 'help', women: womenContext } })
        }
        variant={tab === 'help' ? 'default' : 'outline'}
        size={matches ? 'default' : 'xs'}
      >
        {matches ? 'Hjälp' : <QuestionIcon />}
      </Button>
    ),
    tabBarArray: [
      {
        tab: (
          <Button
            variant={tab === 'maraton' ? 'default' : 'outline'}
            onClick={() => {
              navigate({
                search: { tab: 'maraton', table: 'all', women: womenContext },
              })
            }}
            size={matches ? 'default' : 'xs'}
          >
            {matches ? 'Maratontabeller' : <ListIcon />}
          </Button>
        ),
        tabName: 'maraton',
      },
      {
        tab: (
          <Button
            variant={tab === 'records' ? 'default' : 'outline'}
            onClick={() => {
              navigate({
                search: {
                  tab: 'records',
                  record: 'generalStats',
                  women: womenContext,
                },
              })
            }}
            size={matches ? 'default' : 'xs'}
          >
            {matches ? 'Rekord' : <StatsIcon />}
          </Button>
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
