import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'
import { Outlet, useSearch } from '@tanstack/react-router'
import MaratonTableHeader from './MaratonTableSubComponents/MaratonTableHeader'
// import MaratonTables from './MaratonTableSubComponents/MaratonTables'

const Table = () => {
  const { women } = useSearch({ from: '/_layout' })

  useScrollTo()

  return (
    <>
      <div>
        <h1 className="mb-2 text-center text-sm font-bold leading-4 sm:text-base md:mb-4 lg:text-xl">
          Maratontabell {women ? 'Damer' : 'Herrar'}
        </h1>

        <div className="mx-auto mt-4 flex min-h-screen max-w-7xl flex-col font-inter text-foreground">
          <MaratonTableHeader />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Table
