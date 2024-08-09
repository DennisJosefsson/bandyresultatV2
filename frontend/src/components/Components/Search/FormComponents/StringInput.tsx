import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SearchParamsFields } from '@/lib/types/games/search'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { ChangeEvent, useState } from 'react'

type StringInputProps = {
  field: Extract<SearchParamsFields, 'result' | 'inputDate'>
  label: string
  placeholder: string
}

const StringInput = ({ field, label, placeholder }: StringInputProps) => {
  const searchField = useSearch({
    from: '/_layout/search',
    select: (search) => search[field],
  })
  const [input, setInput] = useState(searchField ?? '')
  const navigate = useNavigate({ from: '/search' })

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        [field]:
          event.target.value.length === 0 ? undefined : event.target.value,
      }),
    })
    setInput(event.target.value)
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 px-1">
      <Label htmlFor={field}>{label}</Label>

      <Input
        value={input}
        onChange={handleOnChange}
        name={field}
        type="text"
        id={field}
        placeholder={placeholder}
      />
    </div>
  )
}

export default StringInput
