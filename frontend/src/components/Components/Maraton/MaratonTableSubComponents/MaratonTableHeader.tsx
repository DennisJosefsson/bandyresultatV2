import { Button } from '@/components/ui/button'
import { useGetMaratonTables } from '@/lib/hooks/dataHooks/maraton/useGetMaratonTables'
import { useNavigate, useSearch } from '@tanstack/react-router'

const MaratonTableHeader = () => {
  const { table, women } = useSearch({ from: '/_layout/maraton' })
  const navigate = useNavigate()
  const { setHomeAwayTitle } = useGetMaratonTables()
  return (
    <div className="mb-2 grid grid-cols-3 gap-4">
      <Button
        variant={table === 'all' ? 'default' : 'outline'}
        size="sm"
        className="truncate text-[8px] sm:text-[10px] lg:text-sm"
        onClick={() => {
          navigate({ search: { tab: 'maraton', table: 'all', women: women } })
          setHomeAwayTitle('')
        }}
      >
        Alla
      </Button>

      <Button
        variant={table === 'home' ? 'default' : 'outline'}
        size="sm"
        className="truncate text-[8px] sm:text-[10px] lg:text-sm"
        onClick={() => {
          navigate({
            search: { tab: 'maraton', table: 'home', women: women },
          })
          setHomeAwayTitle('Hemma')
        }}
      >
        Hemma
      </Button>

      <Button
        variant={table === 'away' ? 'default' : 'outline'}
        size="sm"
        className="truncate text-[8px] sm:text-[10px] lg:text-sm"
        onClick={() => {
          navigate({
            search: { tab: 'maraton', table: 'away', women: women },
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
