//import { useCopyToClipboard } from 'usehooks-ts'
import { Button } from '@/components/ui/button'
import { SearchParamsObject } from '@/lib/types/games/search'
import { useSearch } from '@tanstack/react-router'
import { Dispatch, SetStateAction } from 'react'

// type SearchButtonsProps = {
//   collapse: () => void
//   isSearchResultSuccess: boolean
//   searchLink: string
//   methods: UseFormReturn<SearchParamsObject>
// }

type SearchButtonsProps = {
  setSearchObject: Dispatch<SetStateAction<SearchParamsObject | null>>
}

const SearchButtons = ({ setSearchObject }: SearchButtonsProps) => {
  //const [copiedText, copy] = useCopyToClipboard()
  const searchParams = useSearch({ from: '/_layout/search' })
  console.log(searchParams)

  console.log('logging from searchButton')

  const handleOnClick = () => {
    setSearchObject(searchParams)
  }

  return (
    <div className="flex max-h-[160px] flex-col gap-4">
      <div>
        <Button onClick={handleOnClick}>Sök</Button>
      </div>
      <Button>Nollställ</Button>
      {/* {isSearchResultSuccess && (
        <Button onClick={() => copy(searchLink)}>
          {copiedText ? 'Kopierad!' : `Länk: ${searchLink}`}
        </Button>
      )} */}
    </div>
  )
}

export default SearchButtons
