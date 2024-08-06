import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { ChangeEvent, useState } from 'react'

const ResultInput = () => {
  const { result } = useSearch({ from: '/_layout/search' })
  const [resultInput, setResultInput] = useState(result ?? '')
  const navigate = useNavigate({ from: '/search' })

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        result:
          event.target.value.length === 0 ? undefined : event.target.value,
      }),
    })
    setResultInput(event.target.value)
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="result">Resultat</Label>
      <Input
        value={resultInput}
        onChange={handleOnChange}
        name="result"
        type="result"
        id="result"
        placeholder="T.ex. 5-3"
      />
    </div>
  )
}

export default ResultInput
