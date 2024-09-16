import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetSearchTeams } from '@/lib/hooks/dataHooks/search/useSearchForm'
import { SearchParamsFields } from '@/lib/types/games/search'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { CircleXIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { FixedSizeList } from 'react-window'
import RenderItem from './RenderItem'

type TeamSelectionProps = {
  field: Extract<SearchParamsFields, 'team' | 'opponent'>
  label: string
}

const TeamSelection = ({ field, label }: TeamSelectionProps) => {
  const listRef = useRef<FixedSizeList>(null)
  const searchField = useSearch({
    from: '/_layout/search',
    select: (search) => search[field],
  })
  const women = useSearch({
    from: '/_layout/search',
    select: (search) => search.women,
  })
  const navigate = useNavigate({ from: '/search' })
  const { teamSelection } = useGetSearchTeams()
  const [value, setValue] = useState<string>(searchField?.toString() ?? '')

  useEffect(() => {
    setValue('')
  }, [women])

  useEffect(() => {
    if (value && searchField === undefined) {
      setValue('')
    }
  }, [searchField])

  const onValueChange = (value: string): void => {
    navigate({ search: (prev) => ({ ...prev, [field]: parseInt(value) }) })
    setValue(value)
  }

  const reset = () => {
    navigate({ search: (prev) => ({ ...prev, [field]: undefined }) })
    setValue('')
  }

  const onOpenChange = (open: boolean): void => {
    if (open && listRef && listRef.current && listRef.current.scrollToItem) {
      listRef.current.scrollToItem(
        teamSelection.findIndex((val) => val.value === parseInt(value)),
        'center'
      )
    }
  }

  const selectedLabel = teamSelection.find(
    (val) => val.value === parseInt(value)
  )?.label

  return (
    <div className="flex flex-col gap-1">
      <div>
        <Label>{label}</Label>
      </div>
      <div className="flex flex-row items-center gap-x-2">
        <div>
          <Select
            value={value}
            onValueChange={onValueChange}
            onOpenChange={(open) => onOpenChange(open)}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Välj">{selectedLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <FixedSizeList
                width={'100%'}
                height={250}
                itemCount={teamSelection.length}
                itemSize={30}
                itemData={teamSelection}
                ref={listRef}
              >
                {RenderItem}
              </FixedSizeList>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button onClick={reset} variant="ghost" size="icon">
            <CircleXIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TeamSelection
