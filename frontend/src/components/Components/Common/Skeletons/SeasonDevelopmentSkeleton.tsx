import { Skeleton } from '@/components/ui/skeleton'

const SeasonDevelopmentSkeleton = () => {
  return (
    <div className="mx-auto flex flex-col pt-2 font-inter text-foreground w-full">
      <div className="w-[50%] max-w-[240px] self-center xxs:max-w-xs xs:w-[60%] sm:max-w-sm md:max-w-2xl h-20 mb-2">
        <Skeleton className="w-full h-[72px]" />
      </div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
        <div>
          <div>
            <Skeleton className="h-9 w-32 mb-1" />
          </div>
          <Skeleton className="h-9 w-full mb-1" />
          <Skeleton className="h-9 w-full mb-1" />
        </div>
        <div className="mt-8">
          {Array.from({ length: 14 }).map((_i, index) => {
            return <Skeleton key={index} className="h-9 w-full mb-1" />
          })}
        </div>
      </div>
    </div>
  )
}

export default SeasonDevelopmentSkeleton
