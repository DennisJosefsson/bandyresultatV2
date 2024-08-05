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
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCompareSeasons } from '@/lib/hooks/dataHooks/teams/useCompare'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { FixedSizeList } from 'react-window'
import RenderItem from './RenderItem'

const StartSeason = () => {
  const listRef = useRef<FixedSizeList>(null)
  const { women, startSeason } = useSearch({
    from: '/_layout/teams',
  })
  const navigate = useNavigate({ from: '/teams' })
  const { startOptions } = useCompareSeasons()
  const [value, setValue] = useState<string>(
    startSeason
      ? startSeason.toString()
      : startOptions.slice(0, 1)[0].value.toString()
  )

  const onValueChange = (value: string): void => {
    navigate({ search: (prev) => ({ ...prev, startSeason: parseInt(value) }) })
    setValue(value)
  }

  const onOpenChange = (open: boolean): void => {
    if (open && listRef && listRef.current && listRef.current.scrollToItem) {
      listRef.current.scrollToItem(
        startOptions.findIndex((val) => val.value === parseInt(value)),
        'center'
      )
    }
  }

  const selectedLabel = startOptions.find(
    (val) => val.value === parseInt(value)
  )?.label

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
          <Select
            value={value}
            onValueChange={onValueChange}
            onOpenChange={(open) => onOpenChange(open)}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder={women ? '1972/73' : '1907'}>
                {selectedLabel}
              </SelectValue>
            </SelectTrigger>
            <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
              <FixedSizeList
                width={'100%'}
                height={250}
                itemCount={startOptions.length}
                itemSize={30}
                itemData={startOptions}
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

export default StartSeason
