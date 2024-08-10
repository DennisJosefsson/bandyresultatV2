import { Button } from '@/components/ui/button'
import { SearchParamsObject } from '@/lib/types/games/search'
import { useLocation, useSearch } from '@tanstack/react-router'
import { useCopyToClipboard } from 'usehooks-ts'

type SearchButtonsProps = {
  mutate: (searchParams: SearchParamsObject) => void
}

const baseUrl = import.meta.env.PROD
  ? 'https://bandyresultat.se'
  : 'http://localhost:5173'

const SearchButtons = ({ mutate }: SearchButtonsProps) => {
  const [copiedText, copy] = useCopyToClipboard()
  const searchParams = useSearch({ from: '/_layout/search' })

  const link = useLocation({
    select: (location) => location.href,
  })

  const handleOnClick = () => {
    mutate(searchParams)
  }

  return (
    <div className="flex max-h-[160px] flex-col gap-4">
      <div>
        <Button onClick={handleOnClick}>Sök</Button>
      </div>
      <Button>Nollställ</Button>

      <Button onClick={() => copy(`${baseUrl + link + '&submit=true'}`)}>
        {copiedText ? 'Kopierad!' : 'Länk'}
      </Button>
    </div>
  )
}

export default SearchButtons
