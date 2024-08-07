import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { ChangeEvent, useState } from 'react'

const EndSeasonInput = () => {
  const { endSeason } = useSearch({ from: '/_layout/search' })
  const [endSeasonInput, setEndSeasonInput] = useState(endSeason ?? '')
  const navigate = useNavigate({ from: '/search' })

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        endSeason: isNaN(parseInt(event.target.value))
          ? undefined
          : parseInt(event.target.value),
      }),
    })

    setEndSeasonInput(event.target.value)
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="endSeason">Sista säsong</Label>
      <Input
        value={endSeasonInput}
        onChange={handleOnChange}
        name="endSeason"
        type="endSeason"
        id="endSeason"
        placeholder="T.ex. 2024"
      />
    </div>
  )
}

export default EndSeasonInput
