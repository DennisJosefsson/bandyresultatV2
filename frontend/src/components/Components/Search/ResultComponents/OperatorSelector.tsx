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
  operatorSelection: {
    value: string
    label: string
  }[]
  field: Extract<
    SearchParamsFields,
    'goalDiffOperator' | 'goalsScoredOperator' | 'goalsConcededOperator'
  >
  defaultValue: 'gte' | 'lte' | 'eq'
  label: string
}

const OperatorSelector = ({
  operatorSelection,
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
          {operatorSelection.map((item) => {
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
