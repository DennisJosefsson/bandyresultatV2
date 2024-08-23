import { Button } from '@/components/ui/button'
import { useGetMaratonTables } from '@/lib/hooks/dataHooks/maraton/useGetMaratonTables'
import { useNavigate, useSearch } from '@tanstack/react-router'

const MaratonTableHeader = () => {
  const { table, women } = useSearch({ from: '/_layout/maraton/' })
  const navigate = useNavigate()
  const { setHomeAwayTitle, isPending } = useGetMaratonTables()
  return (
    <div className="mb-2 grid grid-cols-3 gap-4">
      <Button
        disabled={isPending}
        variant={table === 'all' ? 'default' : 'outline'}
        size="sm"
        className="truncate text-[8px] sm:text-[10px] lg:text-sm"
        onClick={() => {
          navigate({ search: { table: 'all', women: women } })
          setHomeAwayTitle('')
        }}
      >
        Alla
      </Button>

      <Button
        disabled={isPending}
        variant={table === 'home' ? 'default' : 'outline'}
        size="sm"
        className="truncate text-[8px] sm:text-[10px] lg:text-sm"
        onClick={() => {
          navigate({
            search: { table: 'home', women: women },
          })
          setHomeAwayTitle('Hemma')
        }}
      >
        Hemma
      </Button>

      <Button
        disabled={isPending}
        variant={table === 'away' ? 'default' : 'outline'}
        size="sm"
        className="truncate text-[8px] sm:text-[10px] lg:text-sm"
        onClick={() => {
          navigate({
            search: { table: 'away', women: women },
          })
          setHomeAwayTitle('Borta')
        }}
      >
        Borta
      </Button>
    </div>
  )
}

export default MaratonTableHeader
