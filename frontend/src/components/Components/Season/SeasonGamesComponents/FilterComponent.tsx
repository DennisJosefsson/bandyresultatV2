import { Input } from '@/components/ui/input'
import { Dispatch, SetStateAction } from 'react'
type FilterComponentProps = {
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
}

const FilterComponent = ({ filter, setFilter }: FilterComponentProps) => {
  return (
    <div className="w-full flex flex-row items-center gap-2">
      <Input
        className="h-6 w-full border-foreground bg-muted focus:border-foreground dark:bg-muted/50 md:h-9"
        type="text"
        placeholder="Filter"
        value={filter}
        name="teamFilter"
        onChange={(event) =>
          setFilter(event.target.value.replace(/[^a-z0-9\u00C0-\u017F]/gi, ''))
        }
      />
    </div>
  )
}

export default FilterComponent
