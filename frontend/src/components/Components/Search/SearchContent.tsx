import { SearchGame } from '@/lib/hooks/dataHooks/search/useSearchForm'
import ResultComponent from './ResultComponent'

type SearchContentProps = { gameArray: SearchGame[] | undefined }

const SearchContent = ({ gameArray }: SearchContentProps) => {
  return (
    <div className="mx-1 mt-2 xl:mx-0">
      <div className="ml-2 w-[18rem] max-w-[800px] lg:ml-0 lg:w-full">
        {/* {searchResult && searchResult.searchResult.length === 0 && (
          <div className="rounded bg-background p-2">
            <p className="">Din sökning gav inga träffar.</p>
          </div>
        )} */}
        <ResultComponent gameArray={gameArray} />
      </div>
    </div>
  )
}

export default SearchContent
