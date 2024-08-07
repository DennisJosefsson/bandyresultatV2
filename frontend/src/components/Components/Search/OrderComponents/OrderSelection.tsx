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

const orderSelection = [
  { value: 'asc', label: 'Stigande' },
  { value: 'desc', label: 'Fallande' },
]

const OrderSelection = () => {
  const order = useSearch({
    from: '/_layout/search',
    select: (search) => search.order,
  })
  const [value, setValue] = useState(order ?? 'asc')
  const navigate = useNavigate({ from: '/search' })

  const onValueChange = (value: string): void => {
    navigate({ search: (prev) => ({ ...prev, order: value }) })
    setValue(value)
  }
  return (
    <div>
      <Label>Stigande/Fallande</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Välj" />
        </SelectTrigger>
        <SelectContent>
          {orderSelection.map((item) => {
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

export default OrderSelection
