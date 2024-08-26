import { Button } from '@/components/ui/button'
import { Link, useSearch } from '@tanstack/react-router'

const RecordHeader = () => {
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })

  return (
    <div className="flex flex-row justify-center">
      <div className="mb-2 grid grid-cols-3 md:grid-cols-5 gap-1 md:gap-4">
        <Link
          to="/maraton/records"
          search={{ women: women }}
          activeOptions={{ includeSearch: false, exact: true }}
        >
          {({ isActive }) => {
            return (
              <Button size="sm" variant={isActive ? 'default' : 'outline'}>
                Statistik
              </Button>
            )
          }}
        </Link>
        <Link
          to="/maraton/records/points"
          search={{ women: women }}
          activeOptions={{ includeSearch: false, exact: true }}
        >
          {({ isActive }) => {
            return (
              <Button size="sm" variant={isActive ? 'default' : 'outline'}>
                Poäng
              </Button>
            )
          }}
        </Link>
        <Link
          to="/maraton/records/scored"
          search={{ women: women }}
          activeOptions={{ includeSearch: false, exact: true }}
        >
          {({ isActive }) => {
            return (
              <Button size="sm" variant={isActive ? 'default' : 'outline'}>
                Gjorda mål
              </Button>
            )
          }}
        </Link>
        <Link
          to="/maraton/records/conceded"
          search={{ women: women }}
          activeOptions={{ includeSearch: false, exact: true }}
        >
          {({ isActive }) => {
            return (
              <Button size="sm" variant={isActive ? 'default' : 'outline'}>
                Insl. mål
              </Button>
            )
          }}
        </Link>
        <Link
          to="/maraton/records/streaks"
          search={{ women: women }}
          activeOptions={{ includeSearch: false, exact: true }}
        >
          {({ isActive }) => {
            return (
              <Button size="sm" variant={isActive ? 'default' : 'outline'}>
                Rekordsviter
              </Button>
            )
          }}
        </Link>
      </div>
    </div>
  )
}

export default RecordHeader
