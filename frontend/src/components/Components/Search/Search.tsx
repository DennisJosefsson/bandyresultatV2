import { useSearchResults } from '@/lib/hooks/dataHooks/search/useSearchForm'
import { useState } from 'react'
import SearchButtons from './SearchButtons'
import SearchContent from './SearchContent'
import SearchError from './SearchError'
import SearchForms from './SearchForms'
import SearchTeamComponent from './SearchTeamComponent'

const Search = () => {
  const [openAccordion, setOpenAccordion] = useState('')
  const { gameArray, mutate, error, isError, isSearchResultSuccess, reset } =
    useSearchResults()

  return (
    <div className="mx-1 mt-2 xl:mx-0">
      <div className="flex flex-col">
        <div className="flex flex-row justify-end">
          <SearchButtons mutate={mutate} setOpenAccordion={setOpenAccordion} />
        </div>
        <div className="ml-2 w-full flex flex-col">
          <div>
            <SearchTeamComponent />

            <SearchForms
              openAccordion={openAccordion}
              setOpenAccordion={setOpenAccordion}
            />
          </div>
          <div>
            {isError ? <SearchError error={error} reset={reset} /> : null}
            {isSearchResultSuccess ? (
              <SearchContent gameArray={gameArray} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
