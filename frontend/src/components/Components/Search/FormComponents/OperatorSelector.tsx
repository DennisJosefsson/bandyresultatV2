import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SearchParamsFields } from '@/lib/types/games/search'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

type OperatorSelectorProps = {
  array: {
    value: string
    label: string
  }[]
  field: Extract<
    SearchParamsFields,
    | 'goalDiffOperator'
    | 'goalsScoredOperator'
    | 'goalsConcededOperator'
    | 'order'
    | 'orderVar'
  >
  defaultValue: 'gte' | 'lte' | 'eq' | 'asc' | 'date'
  label: string
}

const OperatorSelector = ({
  array,
  field,
  defaultValue,
  label,
}: OperatorSelectorProps) => {
  const searchField = useSearch({
    from: '/_layout/search',
    select: (search) => search[field],
  })
  const [value, setValue] = useState(searchField ?? defaultValue)
  const navigate = useNavigate({ from: '/search' })

  const onValueChange = (value: string): void => {
    navigate({ search: (prev) => ({ ...prev, [field]: value }) })
    setValue(value)
  }
  return (
    <div>
      <Label>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Välj" />
        </SelectTrigger>
        <SelectContent>
          {array.map((item) => {
            return (
              <SelectItem value={item.value} key={item.value}>
                {item.label}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

export default OperatorSelector
