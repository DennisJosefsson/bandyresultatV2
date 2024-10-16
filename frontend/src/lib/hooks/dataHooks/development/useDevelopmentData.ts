import { CarouselApi } from '@/components/ui/carousel'
import { getRouteApi } from '@tanstack/react-router'
import { Dispatch, SetStateAction, useEffect } from 'react'

const route = getRouteApi('/_layout/season/$seasonId/development/$group')

const useAnimationData = (
  setRound: Dispatch<SetStateAction<number>>,
  api: CarouselApi | undefined,
  dateApi: CarouselApi | undefined
) => {
  const games = route.useLoaderData({ select: (data) => data.games })
  const serie = route.useLoaderData({ select: (data) => data.serie })
  const dateArrayLength = route.useLoaderData({ select: (data) => data.length })

  useEffect(() => {
    setRound(0)
    api?.scrollTo(0)
    dateApi?.scrollTo(0)
  }, [games, api, dateApi, setRound])

  const dateArray = games.dates

  const justDatesArray = Array.from(dateArray, (item) => {
    const dateArray = item.date.split('-')
    const date = `${parseInt(dateArray[2])}/${parseInt(dateArray[1])}`
    return date
  })

  const groupName = serie.serieName

  return {
    games,
    length,
    dateArray,
    dateArrayLength,
    justDatesArray,
    groupName,
    serie,
  }
}

export default useAnimationData
