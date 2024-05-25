import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { TabBarDivided } from '@/components/Components/Common/TabBar'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from 'usehooks-ts'
import {
  ListIcon,
  ManIcon,
  StatsIcon,
  WomanIcon,
  QuestionIcon,
} from '@/components/Components/Common/Icons/icons'
import { useNavigate, useSearch } from '@tanstack/react-router'

const MaratonTabBar = () => {
  const { tab } = useSearch({ from: '/_layout/maraton' })
  const navigate = useNavigate()
  const { women } = useGenderContext()
  const matches = useMediaQuery('(min-width: 430px)')
  const maratonTabBarObject = {
    gender: (
      <Button
        onClick={() => {
          navigate({ search: (prev) => ({ ...prev, women: !women }) })
        }}
        variant="default"
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
        onClick={() => navigate({ search: { tab: 'help' } })}
        variant={tab === 'help' ? 'default' : 'outline'}
        size={matches ? 'default' : 'icon'}
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
                search: { tab: 'maraton', table: 'all', women: women },
              })
            }}
            size={matches ? 'default' : 'icon'}
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
                  women: women,
                },
              })
            }}
            size={matches ? 'default' : 'icon'}
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
