//import { useCopyToClipboard } from 'usehooks-ts'
import { Button } from '@/components/ui/button'
import { useFormContext } from 'react-hook-form'
import { defaultValues } from '@/lib/hooks/dataHooks/search/useSearchForm'

// type SearchButtonsProps = {
//   collapse: () => void
//   isSearchResultSuccess: boolean
//   searchLink: string
//   methods: UseFormReturn<SearchParamsObject>
// }

const SearchButtons = () => {
  //const [copiedText, copy] = useCopyToClipboard()
  const methods = useFormContext()

  return (
    <div className="flex max-h-[160px] flex-col gap-4">
      <div>
        <Button type="submit" form="search">
          Sök
        </Button>
      </div>
      <Button onClick={() => methods.reset(defaultValues)}>Nollställ</Button>
      {/* {isSearchResultSuccess && (
        <Button onClick={() => copy(searchLink)}>
          {copiedText ? 'Kopierad!' : `Länk: ${searchLink}`}
        </Button>
      )} */}
    </div>
  )
}

export default SearchButtons
