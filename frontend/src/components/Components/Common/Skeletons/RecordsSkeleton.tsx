import { Skeleton } from '@/components/ui/skeleton'
import RecordHeader from '../../Maraton/RecordSubComponents/RecordHeader'

const RecordsSkeleton = () => {
  return (
    <div className="mx-auto mt-2 min-h-screen font-inter text-foreground w-full">
      <div className="flex flex-col">
        <RecordHeader />
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 24 }).map((_i, index) => {
            return <Skeleton key={index} className="h-12 w-full" />
          })}
        </div>
      </div>
    </div>
  )
}

export default RecordsSkeleton
