import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const homeGameArray = [
  { value: 'both', label: 'Alla' },
  { value: 'home', label: 'Hemma' },
  { value: 'away', label: 'Borta' },
]

const HomeGame = () => {
  const homeGame = useSearch({
    from: '/_layout/search',
    select: (search) => search.homeGame,
  })
  const [selectedHomeGame, setSelectedHomeGame] = useState<string>(
    homeGame ?? 'both'
  )
  const navigate = useNavigate({ from: '/teams' })

  const handleOnChange = (value: string) => {
    navigate({ search: (prev) => ({ ...prev, homeGame: value }) })
    setSelectedHomeGame(value)
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Hemma/Borta</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            name="homeGame"
            onValueChange={handleOnChange}
            defaultValue={selectedHomeGame}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-2 lg:gap-x-12">
              {homeGameArray.map((cat) => {
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

export default HomeGame
