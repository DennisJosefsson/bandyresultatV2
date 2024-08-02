import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCompareSeasons } from '@/lib/hooks/dataHooks/teams/useCompare'
import { useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import { FixedSizeList } from 'react-window'

const StartSeason = () => {
  const { women, startSeason } = useSearch({
    from: '/_layout/teams',
  })
  const { startOptions } = useCompareSeasons()
  const [value, setValue] = useState<string>(
    startSeason
      ? startSeason.toString()
      : startOptions.slice(0, 1)[0].value.toString()
  )

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Första säsong</CardTitle>
          <CardDescription>
            Första säsong måste komma före sista säsong.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder={women ? '1972/73' : '1907'} />
            </SelectTrigger>
            <SelectContent>
              <FixedSizeList
                width={'100%'}
                height={250}
                itemCount={startOptions.length}
                itemSize={30}
              >
                {({ index, style }) => (
                  <SelectItem
                    value={startOptions[index].value.toString()}
                    key={startOptions[index].value}
                    style={{
                      ...style,
                    }}
                  >
                    {startOptions[index].label}
                  </SelectItem>
                )}
              </FixedSizeList>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}

export default StartSeason
