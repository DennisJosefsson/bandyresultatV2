import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

const orderVariableSelection = [
  { value: 'date', label: 'Datum' },
  { value: 'totalGoals', label: 'Antal mål' },
  { value: 'goalDifference', label: 'Målskillnad' },
  { value: 'goalsScored', label: 'Gjorda mål' },
  { value: 'goalsConceded', label: 'Insläppta mål' },
]

const OrderVariableSelection = () => {
  const orderVar = useSearch({
    from: '/_layout/search',
    select: (search) => search.orderVar,
  })
  const [value, setValue] = useState(orderVar ?? 'date')
  const navigate = useNavigate({ from: '/search' })

  const onValueChange = (value: string): void => {
    navigate({ search: (prev) => ({ ...prev, orderVar: value }) })
    setValue(value)
  }
  return (
    <div>
      <Label>Sorteringsvariabel</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Välj" />
        </SelectTrigger>
        <SelectContent>
          {orderVariableSelection.map((item) => {
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

export default OrderVariableSelection
