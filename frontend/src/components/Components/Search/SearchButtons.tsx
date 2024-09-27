import { Button } from '@/components/ui/button'
import { searchParams as searchParamsObject } from '@/lib/types/games/search'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Dispatch, SetStateAction } from 'react'
import { z } from 'zod'

type SearchButtonsProps = {
  mutate: (searchParams: z.infer<typeof searchParamsObject>) => void
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
