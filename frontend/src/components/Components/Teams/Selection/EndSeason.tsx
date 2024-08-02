import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

const EndSeason = () => {
  const { endSeason } = useSearch({
    from: '/_layout/teams',
  })

  const { endOptions, endOptionsPlaceholder } = useCompareSeasons()
  const [value, setValue] = useState<string>(
    endSeason
      ? endSeason.toString()
      : endOptions.slice(0, 1)[0].value.toString()
  )

  console.log(value)

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Sista säsong</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder={endOptionsPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <FixedSizeList
                width={'100%'}
                height={250}
                itemCount={endOptions.length}
                itemSize={30}
              >
                {({ index, style }) => (
                  <SelectItem
                    value={endOptions[index].value.toString()}
                    key={endOptions[index].value}
                    style={{
                      ...style,
                    }}
                  >
                    {endOptions[index].label}
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

export default EndSeason
