import { Skeleton } from '@/components/ui/skeleton'
import { useGetMaratonTables } from '@/lib/hooks/dataHooks/maraton/useGetMaratonTables'
import { useSearch } from '@tanstack/react-router'
import MaratonTableHeader from '../../Maraton/MaratonTableSubComponents/MaratonTableHeader'

const MaratonSkeleton = () => {
  const { women } = useSearch({ from: '/_layout' })

  const { homeAwayTitle } = useGetMaratonTables()
  return (
    <div className="w-full">
      <h1 className="mb-2 text-center text-sm font-bold leading-4 sm:text-base md:mb-4 lg:text-xl">
        Maratontabell {women ? 'Damer' : 'Herrar'} {homeAwayTitle}
      </h1>
      <div className="mx-auto mt-4 flex min-h-screen max-w-7xl flex-col font-inter text-foreground">
        <MaratonTableHeader />
        {Array.from({ length: 42 }).map((_i, index) => {
          return <Skeleton key={index} className="h-6 md:h-9 w-full mb-1" />
        })}
      </div>
    </div>
  )
}

export default MaratonSkeleton
