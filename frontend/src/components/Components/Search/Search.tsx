import { useSearchResults } from '@/lib/hooks/dataHooks/search/useSearchForm'
import { useState } from 'react'
import SearchButtons from './SearchButtons'
import SearchContent from './SearchContent'
import SearchForms from './SearchForms'
import SearchTeamComponent from './SearchTeamComponent'

const Search = () => {
  const [openAccordion, setOpenAccordion] = useState('')
  const { gameArray, setSearchObject } = useSearchResults()
  return (
    <div className="mx-1 mt-2 xl:mx-0">
      <div className="flex flex-row-reverse justify-between">
        <SearchButtons setSearchObject={setSearchObject} />
        <div className="ml-2 w-full flex flex-col">
          <div>
            <SearchTeamComponent />
            <SearchForms
              openAccordion={openAccordion}
              setOpenAccordion={setOpenAccordion}
            />
          </div>
          <div>
            <SearchContent gameArray={gameArray} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
