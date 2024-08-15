import { useGetMaratonTables } from '@/lib/hooks/dataHooks/maraton/useGetMaratonTables'
import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'
import { useSearch } from '@tanstack/react-router'
import MaratonTableHeader from './MaratonTableSubComponents/MaratonTableHeader'
import MaratonTables from './MaratonTableSubComponents/MaratonTables'

const Table = () => {
  const { women } = useSearch({ from: '/_layout' })

  const { tabell, homeAwayTitle } = useGetMaratonTables()

  useScrollTo()

  return (
    <>
      {tabell && (
        <div>
          <h1 className="mb-2 text-center text-sm font-bold leading-4 sm:text-base md:mb-4 lg:text-xl">
            Maratontabell {women ? 'Damer' : 'Herrar'} {homeAwayTitle}
          </h1>

          <div className="mx-auto mt-4 flex min-h-screen max-w-7xl flex-col font-inter text-foreground">
            <MaratonTableHeader />
            <MaratonTables tabell={tabell} />
          </div>
        </div>
      )}
    </>
  )
}

export default Table
