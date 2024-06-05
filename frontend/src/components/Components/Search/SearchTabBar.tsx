import { Button } from '@/components/ui/button'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { initValues } from '@/lib/hooks/dataHooks/search/useSearchForm'
import { SearchParamsObject } from '@/lib/types/games/search'
import { Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useMediaQuery } from 'usehooks-ts'
import { ManIcon, WomanIcon, SearchIcon } from '../Common/Icons/icons'
import { TabBarDivided } from '../Common/TabBar'

type SearchTabBarProps = {
  tab: string
  setTab: Dispatch<SetStateAction<string>>
  methods: UseFormReturn<SearchParamsObject>
}

const SearchTabBar = ({ tab, setTab, methods }: SearchTabBarProps) => {
  const { women, dispatch } = useGenderContext()
  const matches = useMediaQuery('(min-width: 430px)')
  const searchTabBarObject = {
    gender: (
      <Button
        onClick={() => {
          dispatch({ type: 'TOGGLE' })
          methods.reset(initValues)
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

    tabBarArray: [
      {
        tab: (
          <Button
            variant={tab === 'search' ? 'default' : 'outline'}
            onClick={() => {
              setTab('search')
            }}
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
