import { Input } from '@/components/ui/input'
import { Dispatch, SetStateAction } from 'react'
type FilterComponentProps = {
  seasonFilter: string
  setSeasonFilter: Dispatch<SetStateAction<string>>
}

const FilterComponent = ({
  seasonFilter,
  setSeasonFilter,
}: FilterComponentProps) => {
  return (
    <div className="w-full ">
      <Input
        className="w-full border-foreground bg-muted focus:border-foreground dark:bg-muted/50"
        type="text"
        placeholder="Filter"
        value={seasonFilter}
        name="seasonFilter"
        onChange={(event) =>
          setSeasonFilter(event.target.value.replace(/[^0-9]/gi, ''))
        }
      />
    </div>
  )
}

export default FilterComponent
