import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const selectedGenderArray = [
  { value: 'all', label: 'Alla' },
  { value: 'men', label: 'Herrar' },
  { value: 'women', label: 'Damer' },
]

const SelectedGender = () => {
  const selectedGender = useSearch({
    from: '/_layout/search',
    select: (search) => search.selectedGender,
  })
  const [selectedSelectedGender, setSelectedSelectedGender] = useState<string>(
    selectedGender ?? 'all'
  )
  const navigate = useNavigate({ from: '/teams' })

  const handleOnChange = (value: string) => {
    navigate({ search: (prev) => ({ ...prev, selectedGender: value }) })
    setSelectedSelectedGender(value)
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Dam/Herr</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            name="selectedGender"
            onValueChange={handleOnChange}
            defaultValue={selectedSelectedGender}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-2 lg:gap-x-12">
              {selectedGenderArray.map((cat) => {
                return (
                  <div
                    key={cat.value}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <Label htmlFor={cat.value}>{cat.label}</Label>
                    <RadioGroupItem value={cat.value} id={cat.value} />
                  </div>
                )
              })}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}

export default SelectedGender
