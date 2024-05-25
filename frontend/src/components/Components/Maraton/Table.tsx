import MaratonTableHeader from './MaratonTableSubComponents/MaratonTableHeader'
import MaratonTables from './MaratonTableSubComponents/MaratonTables'
import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { useGetMaratonTables } from '@/lib/hooks/dataHooks/maraton/useGetMaratonTables'

const Table = () => {
  const { women } = useGenderContext()

  const { tabell, homeAwayTitle } = useGetMaratonTables()

  useScrollTo()

  return (
    <>
      {tabell && (
        <div>
          <h2 className="mt-4 text-center text-base font-bold leading-4 sm:text-xl lg:text-2xl">
            Maratontabell {women ? 'Damer' : 'Herrar'} {homeAwayTitle}
          </h2>

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
