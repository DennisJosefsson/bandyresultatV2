import { Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
type SeasonTablesButtonListProps = {
  setHomeAwayTitle: Dispatch<SetStateAction<string>>
  setSelectedTable: Dispatch<SetStateAction<string>>
  table: string
}
const SeasonTablesButtonList = ({
  setHomeAwayTitle,
  setSelectedTable,
  table,
}: SeasonTablesButtonListProps) => {
  return (
    <div className="my-2 grid w-full grid-cols-3 justify-center gap-4 px-6 sm:px-2 md:flex md:flex-row lg:px-0">
      <Button
        size="sm"
        className="truncate text-[8px] sm:text-[10px] lg:text-sm"
        variant={table === 'all' ? 'default' : 'outline'}
        onClick={() => {
          setSelectedTable('all')
          setHomeAwayTitle('')
        }}
      >
        Alla matcher
      </Button>
      <Button
        size="sm"
        className="truncate text-[8px] sm:text-[10px] lg:text-sm"
        variant={table === 'home' ? 'default' : 'outline'}
        onClick={() => {
          setSelectedTable('home')
          setHomeAwayTitle('Hemma')
        }}
      >
        Hemmatabell
      </Button>
      <Button
        size="sm"
        className="truncate text-[8px] sm:text-[10px] lg:text-sm"
        variant={table === 'away' ? 'default' : 'outline'}
        onClick={() => {
          setSelectedTable('away')
          setHomeAwayTitle('Borta')
        }}
      >
        Bortatabell
      </Button>
    </div>
  )
}

export default SeasonTablesButtonList
