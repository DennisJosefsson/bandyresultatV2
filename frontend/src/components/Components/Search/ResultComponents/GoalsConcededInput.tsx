import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { ChangeEvent, useState } from 'react'

const GoalsConcededInput = () => {
  const { goalsConceded } = useSearch({ from: '/_layout/search' })
  const [goalsConcededInput, setGoalsConcededInput] = useState(
    goalsConceded ?? ''
  )
  const navigate = useNavigate({ from: '/search' })

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        goalsConceded: isNaN(parseInt(event.target.value))
          ? undefined
          : parseInt(event.target.value),
      }),
    })
    setGoalsConcededInput(event.target.value)
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="goalsConceded">Insläppta mål</Label>
      <Input
        value={goalsConcededInput}
        onChange={handleOnChange}
        name="goalsConceded"
        type="goalsConceded"
        id="goalsConceded"
        placeholder=""
      />
    </div>
  )
}

export default GoalsConcededInput
