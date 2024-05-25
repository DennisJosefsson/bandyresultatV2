import { Button } from '@/components/ui/button'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { useGetMaratonTables } from '@/lib/hooks/dataHooks/maraton/useGetMaratonTables'
import { useNavigate, useSearch } from '@tanstack/react-router'

const MaratonTableHeader = () => {
  const { table } = useSearch({ from: '/_layout/maraton' })
  const { women } = useGenderContext()
  const navigate = useNavigate()
  const { setHomeAwayTitle } = useGetMaratonTables()
  return (
    <div className="mb-2 flex flex-row justify-center gap-4">
      <div>
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
      </div>
      <div>
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
      </div>
      <div>
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
    </div>
  )
}

export default MaratonTableHeader
