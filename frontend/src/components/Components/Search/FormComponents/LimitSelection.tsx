import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

const limitSelection = [
  { value: '5', label: '5' },
  { value: '10', label: '10' },
  { value: '15', label: '15' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
]

const route = getRouteApi('/_layout/search')

const LimitSelection = () => {
  const limit = route.useSearch({
    select: (search) => search.limit,
  })
  const [value, setValue] = useState(limit?.toString() ?? '10')
  const navigate = useNavigate({ from: '/search' })

  const onValueChange = (value: string): void => {
    navigate({
      resetScroll: false,
      search: (prev) => ({ ...prev, limit: parseInt(value) }),
    })
    setValue(value)
  }
  return (
    <div>
      <Label>Antal träffar</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Välj" />
        </SelectTrigger>
        <SelectContent>
          {limitSelection.map((item) => {
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

export default LimitSelection
