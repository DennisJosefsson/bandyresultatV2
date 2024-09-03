import { Button } from '@/components/ui/button'
import { Link, useSearch } from '@tanstack/react-router'

const MaratonTableHeader = () => {
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  return (
    <div>
      <h1 className="mb-2 text-center text-sm font-bold leading-4 sm:text-base md:mb-4 lg:text-xl">
        Maratontabell {women ? 'Damer' : 'Herrar'}
      </h1>
      <div className="flex flex-row justify-center">
        <div className="mb-2 grid grid-cols-3 gap-4">
          <div className="flex flex-row justify-center">
            <Link
              to="/maraton/table/$table"
              params={{ table: 'all' }}
              search={{ women: women }}
              activeOptions={{ includeSearch: false, exact: true }}
            >
              {({ isActive }) => (
                <Button variant={isActive ? 'default' : 'outline'} size="sm">
                  Alla
                </Button>
              )}
            </Link>
          </div>
          <div className="flex flex-row justify-center">
            <Link
              to="/maraton/table/$table"
              params={{ table: 'home' }}
              search={{ women: women }}
              activeOptions={{ includeSearch: false, exact: true }}
            >
              {({ isActive }) => (
                <Button variant={isActive ? 'default' : 'outline'} size="sm">
                  Hemma
                </Button>
              )}
            </Link>
          </div>
          <div className="flex flex-row justify-center">
            <Link
              to="/maraton/table/$table"
              params={{ table: 'away' }}
              search={{ women: women }}
              activeOptions={{ includeSearch: false, exact: true }}
            >
              {({ isActive }) => (
                <Button variant={isActive ? 'default' : 'outline'} size="sm">
                  Borta
                </Button>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaratonTableHeader
