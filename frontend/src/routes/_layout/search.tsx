import Spinner from '@/components/Components/Common/Spinner'
import SearchContent from '@/components/Components/Search/SearchContent'
import SearchHelp from '@/components/Components/Search/SearchFormModal'
import { Button } from '@/components/ui/button'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import {
  useSearchForm,
  useGetSearchTeams,
  initValues,
} from '@/lib/hooks/dataHooks/search/useSearchForm'
import { SearchParamsObject } from '@/lib/types/games/search'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export type ErrorState =
  | {
      error: true
      message: string
    }
  | { error: false }

export const Route = createFileRoute('/_layout/search')({
  component: Search,
})

function Search() {
  const { women, dispatch } = useGenderContext()
  const [tab, setTab] = useState<string>('search')

  const [searchParams, setSearchParams] = useState<SearchParamsObject | null>(
    null
  )

  const [error, setError] = useState<ErrorState>({ error: false })
  const methods = useSearchForm()

  const { isLoading: isTeamsLoading, error: teamError } = useGetSearchTeams()

  if (isTeamsLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
        <Spinner />
      </div>
    )
  }

  if (teamError) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
        Något gick fel.
      </div>
    )
  }

  // console.log('Målskillnadoperator', methods.getValues('goalDiffOperator'))
  // console.log('Målskillnad', methods.getValues('goalDiff'))
  //console.log('Team', methods.getValues('team') === '')

  // console.log(searchResult)

  return (
    <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-foreground">
      <Tabs value={tab} onValueChange={setTab}>
        <div className="hidden items-center xs:mb-2 xs:flex xs:flex-row xs:justify-between xs:gap-1 md:gap-2">
          <div>
            <TabsList>
              <TabsTrigger value="search">Sök</TabsTrigger>
              <TabsTrigger value="help">Hjälp</TabsTrigger>
            </TabsList>
          </div>
          <div>
            <Button
              variant="outline"
              onClick={() => {
                dispatch({ type: 'TOGGLE' })
                methods.reset(initValues)
              }}
            >
              {women ? 'Herr' : 'Dam'}
            </Button>
          </div>
        </div>
        <TabsContent value="search">
          <SearchContent
            methods={methods}
            error={error}
            setError={setError}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </TabsContent>
        <TabsContent value="help">
          <SearchHelp />
        </TabsContent>
      </Tabs>
    </div>
  )
}
