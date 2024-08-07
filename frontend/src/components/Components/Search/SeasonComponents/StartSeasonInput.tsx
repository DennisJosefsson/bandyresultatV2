import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { ChangeEvent, useState } from 'react'

const StartSeasonInput = () => {
  const { startSeason } = useSearch({ from: '/_layout/search' })
  const [startSeasonInput, setStartSeasonInput] = useState(startSeason ?? '')
  const navigate = useNavigate({ from: '/search' })

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        startSeason: isNaN(parseInt(event.target.value))
          ? undefined
          : parseInt(event.target.value),
      }),
    })

    setStartSeasonInput(event.target.value)
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="startSeason">Första säsong</Label>
      <Input
        value={startSeasonInput}
        onChange={handleOnChange}
        name="startSeason"
        type="startSeason"
        id="startSeason"
        placeholder="T.ex. 1907"
      />
    </div>
  )
}

export default StartSeasonInput
