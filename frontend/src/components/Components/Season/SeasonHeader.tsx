import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import useGetAllSeasons from '@/lib/hooks/dataHooks/season/useGetAllSeasons'
import {
  Link,
  useLinkProps,
  useParams,
  useSearch,
} from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getParsedRoute, getSeasonArray, getSeasonIndex } from './utils/utils'

const SeasonHeader = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedButton, setSelectedButton] = useState(0)
  const { seasons } = useGetAllSeasons()
  const { women } = useSearch({ from: '/_layout' })
  const seasonId = useParams({
    from: '/_layout/season/$seasonId',
    select: (params) => params.seasonId,
  })

  const linkArray = useLinkProps({
    from: '/season/$seasonId',
    search: { women },
  }).href?.split('/')

  const parsedRoute = getParsedRoute(linkArray)

  const seasonArray = getSeasonArray(seasons)

  const startIndex = getSeasonIndex(seasonArray, seasonId)

  useEffect(() => {
    if (!api) return
    api.on('select', () => {
      setSelectedButton(api.selectedScrollSnap())
    })
  }, [api])

  useEffect(() => {
    if (!startIndex) return
    setSelectedButton(startIndex)
  }, [startIndex])

  return (
    <div className="mb-0.5 flex items-center justify-center sm:mb-1 xl:mb-2">
      <Carousel
        setApi={setApi}
        className="w-[50%] max-w-[240px] self-center xxs:max-w-xs xs:w-[60%] sm:max-w-sm md:max-w-2xl"
        opts={{ startIndex: startIndex ?? 0, loop: true }}
      >
        <CarouselContent className="-ml-1">
          {seasonArray.map((season) => {
            return (
              <CarouselItem key={season.index} className="px-1 sm:basis-1/3">
                <div className="flex items-center justify-center">
                  <Button
                    size="lg"
                    variant="ghost"
                    asChild
                    className={
                      season.index === selectedButton
                        ? 'text-xs font-semibold sm:text-sm lg:text-xl'
                        : 'text-[10px] sm:text-xs lg:text-lg'
                    }
                  >
                    <Link
                      to={`/season/$seasonId/${parsedRoute}`}
                      params={{ seasonId: season.season }}
                      search={{ women }}
                    >
                      {season.year}
                    </Link>
                  </Button>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="h-3 w-3 lg:h-6 lg:w-6" />
        <CarouselNext className="h-3 w-3 lg:h-6 lg:w-6" />
      </Carousel>
    </div>
  )
}

export default SeasonHeader
