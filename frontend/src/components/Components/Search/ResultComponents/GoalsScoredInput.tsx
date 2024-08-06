import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { ChangeEvent, useState } from 'react'

const GoalsScoredInput = () => {
  const { goalsScored } = useSearch({ from: '/_layout/search' })
  const [goalsScoredInput, setGoalsScoredInput] = useState(goalsScored ?? '')
  const navigate = useNavigate({ from: '/search' })

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        goalsScored: isNaN(parseInt(event.target.value))
          ? undefined
          : parseInt(event.target.value),
      }),
    })
    setGoalsScoredInput(event.target.value)
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="goalsScored">Gjorda mål</Label>
      <Input
        value={goalsScoredInput}
        onChange={handleOnChange}
        name="goalsScored"
        type="goalsScored"
        id="goalsScored"
        placeholder=""
      />
    </div>
  )
}

export default GoalsScoredInput
