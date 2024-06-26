import { UseFormReturn } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import ResultComponent from './ResultComponent'

import { useSearchResults } from '@/lib/hooks/dataHooks/search/useSearchForm'
import { SearchParamsObject } from '@/lib/types/games/search'
import { ErrorState } from '@/lib/hooks/dataHooks/search/useSearchForm'

type SearchContentProps = {
  methods: UseFormReturn<SearchParamsObject>
  searchParams: SearchParamsObject | null
  setSearchParams: Dispatch<SetStateAction<SearchParamsObject | null>>
  setError: Dispatch<SetStateAction<ErrorState>>
  error: ErrorState
}

const SearchContent = ({
  error,
  setError,
  searchParams,
}: SearchContentProps) => {
  const { searchResult, gameArray } = useSearchResults(searchParams, setError)

  return (
    <div className="mx-1 mt-2 xl:mx-0">
      <div className="ml-2 w-[18rem] max-w-[800px] lg:ml-0 lg:w-full">
        {error.error && (
          <div className="mb-2 rounded border-red-700 bg-background p-2 text-sm font-semibold text-red-700 md:text-base">
            {error.message}
          </div>
        )}
        {searchResult && searchResult.searchResult.length === 0 && (
          <div className="rounded bg-background p-2">
            <p className="">Din sökning gav inga träffar.</p>
          </div>
        )}
        {searchResult && <ResultComponent gameArray={gameArray} />}
      </div>
    </div>
  )
}

export default SearchContent
