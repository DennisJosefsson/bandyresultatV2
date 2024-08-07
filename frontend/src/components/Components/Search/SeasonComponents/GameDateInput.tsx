import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { ChangeEvent, useState } from 'react'

const GameDateInput = () => {
  const { inputDate } = useSearch({ from: '/_layout/search' })
  const [inputDateInput, setInputDateInput] = useState(inputDate ?? '')
  const navigate = useNavigate({ from: '/search' })

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        inputDate:
          event.target.value.length === 0 ? undefined : event.target.value,
      }),
    })

    setInputDateInput(event.target.value)
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="inputDate">Matchdatum</Label>
      <Input
        value={inputDateInput}
        onChange={handleOnChange}
        name="inputDate"
        type="inputDate"
        id="inputDate"
        placeholder="T.ex. 26/12"
      />
    </div>
  )
}

export default GameDateInput
