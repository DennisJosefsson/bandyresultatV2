import { Button } from '@/components/ui/button'
import { SearchParamsObject } from '@/lib/types/games/search'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Dispatch, SetStateAction } from 'react'

type SearchButtonsProps = {
  mutate: (searchParams: SearchParamsObject) => void
  setOpenAccordion: Dispatch<SetStateAction<string>>
}

const SearchButtons = ({ mutate, setOpenAccordion }: SearchButtonsProps) => {
  const searchParams = useSearch({ from: '/_layout/search' })
  const navigate = useNavigate({ from: '/search' })
  const handleOnClick = () => {
    mutate(searchParams)
    setOpenAccordion('')
  }

  const reset = () => {
    navigate({ search: { women: searchParams.women } })
    setOpenAccordion('')
  }

  return (
    <div className="flex max-h-[160px] flex-row gap-2">
      <Button onClick={handleOnClick}>Skicka</Button>

      <Button onClick={reset}>Nollställ</Button>
    </div>
  )
}

export default SearchButtons
