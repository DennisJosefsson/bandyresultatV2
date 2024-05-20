import { Link, useLinkProps, useParams } from '@tanstack/react-router'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { Button } from '@/components/ui/button'
import useGetAllSeasons from '@/lib/hooks/dataHooks/season/useGetAllSeasons'
import { useState, useEffect } from 'react'

import { z } from 'zod'
const parseParam = z
  .enum(['map', 'playoff', 'tables', 'games', 'help', 'roundForRound', 'stats'])
  .catch('tables')

const SeasonHeader = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedButton, setSelectedButton] = useState(0)
  const { seasons } = useGetAllSeasons()
  const seasonId = useParams({ from: '/_layout/season/$seasonId' }).seasonId
  const linkArray = useLinkProps({ from: '/season/$seasonId' }).href?.split('/')
  const route = linkArray ? linkArray[linkArray?.length - 1] : ''
  const parsedRoute = parseParam.parse(route)

  const seasonArray = seasons
    .filter((season) => season.women === false)
    .sort((a, b) => (a.seasonId > b.seasonId ? 1 : -1))
    .map((season, index) => {
      return {
        year: season.year,
        season:
          parseInt(season.year) < 1964
            ? season.year
            : season.year.split('/')[1],
        index: index,
      }
    })

  const startIndex = seasonArray.find((season) => {
    const seasonYear =
      parseInt(seasonId) < 1964
        ? seasonId
        : `${parseInt(seasonId) - 1}/${seasonId}`
    return season.year === seasonYear
  })?.index

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
