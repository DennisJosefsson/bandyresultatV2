import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const resultCategoryArray = [
  { value: 'all', label: 'Alla' },
  { value: 'win', label: 'Vinst' },
  { value: 'lost', label: 'Förlust' },
  { value: 'draw', label: 'Oavgjort' },
]

const GameResult = () => {
  const gameResult = useSearch({
    from: '/_layout/search',
    select: (search) => search.gameResult,
  })
  const [selectedGameResult, setSelectedGameResult] = useState<string>(
    gameResult ?? 'all'
  )
  const navigate = useNavigate({ from: '/teams' })

  const handleOnChange = (value: string) => {
    navigate({ search: (prev) => ({ ...prev, gameResult: value }) })
    setSelectedGameResult(value)
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Matchresultat</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            name="gameResult"
            onValueChange={handleOnChange}
            defaultValue={selectedGameResult}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-2 lg:gap-x-12">
              {resultCategoryArray.map((cat) => {
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

export default GameResult
