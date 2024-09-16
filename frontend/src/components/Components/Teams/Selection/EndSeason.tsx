import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCompareSeasons } from '@/lib/hooks/dataHooks/teams/useCompare'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { FixedSizeList } from 'react-window'
import RenderItem from './RenderItem'

const EndSeason = () => {
  const listRef = useRef<FixedSizeList>(null)
  const { endSeason } = useSearch({
    from: '/_layout/teams',
  })
  const navigate = useNavigate({ from: '/teams' })
  const { endOptions, endOptionsPlaceholder } = useCompareSeasons()
  const [value, setValue] = useState<string>(
    endSeason
      ? endSeason.toString()
      : endOptions.slice(0, 1)[0].value.toString()
  )

  const onValueChange = (value: string): void => {
    navigate({
      resetScroll: false,
      search: (prev) => ({ ...prev, endSeason: parseInt(value) }),
    })
    setValue(value)
  }

  const onOpenChange = (open: boolean): void => {
    if (open && listRef && listRef.current && listRef.current.scrollToItem) {
      listRef.current.scrollToItem(
        endOptions.findIndex((val) => val.value === parseInt(value)),
        'center'
      )
    }
  }

  const selectedLabel = endOptions.find(
    (val) => val.value === parseInt(value)
  )?.label

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Sista säsong</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={value}
            onValueChange={onValueChange}
            onOpenChange={(open) => onOpenChange(open)}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder={endOptionsPlaceholder}>
                {selectedLabel}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <FixedSizeList
                width={'100%'}
                height={250}
                itemCount={endOptions.length}
                itemSize={30}
                itemData={endOptions}
                ref={listRef}
              >
                {RenderItem}
              </FixedSizeList>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}

export default EndSeason
