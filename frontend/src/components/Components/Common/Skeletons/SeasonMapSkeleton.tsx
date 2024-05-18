import { Skeleton } from '@/components/ui/skeleton'

const SeasonMapSkeleton = () => {
  return (
    <div className="w-full">
      <Skeleton className="h-[400px] w-screen max-w-xl p-2" />
    </div>
  )
}

export default SeasonMapSkeleton
