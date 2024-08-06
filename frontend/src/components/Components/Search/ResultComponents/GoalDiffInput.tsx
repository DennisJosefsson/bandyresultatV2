import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { ChangeEvent, useState } from 'react'

const GoalDiffInput = () => {
  const { goalDiff } = useSearch({ from: '/_layout/search' })
  const [goalDiffInput, setGoalDiffInput] = useState(goalDiff ?? '')
  const navigate = useNavigate({ from: '/search' })

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        goalDiff: isNaN(parseInt(event.target.value))
          ? undefined
          : parseInt(event.target.value),
      }),
    })
    setGoalDiffInput(event.target.value)
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="goalDiff">Målskillnad</Label>
      <Input
        value={goalDiffInput}
        onChange={handleOnChange}
        name="goalDiff"
        type="goalDiff"
        id="goalDiff"
        placeholder=""
      />
    </div>
  )
}

export default GoalDiffInput
