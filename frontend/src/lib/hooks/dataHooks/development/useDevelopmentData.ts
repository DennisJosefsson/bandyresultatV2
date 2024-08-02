import { CarouselApi } from '@/components/ui/carousel'
import { developmentQueries } from '@/lib/queries/development/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { Dispatch, SetStateAction, useEffect } from 'react'

const useAnimationData = (
  seasonId: string,
  group: string | null,
  setGroup: Dispatch<SetStateAction<string | null>>,
  setRound: Dispatch<SetStateAction<number>>,
  api: CarouselApi | undefined,
  dateApi: CarouselApi | undefined
) => {
  const { women } = useSearch({ from: '/_layout' })
  const { data, isLoading, error, isSuccess } = useSuspenseQuery(
    developmentQueries['data'](seasonId)
  )

  useEffect(() => {
    const object = data.find((item) => item.women === women)

    const groupArray = object ? object.games.map((item) => item.group) : []
    if (groupArray.length === 1) {
      setGroup(groupArray[0])
    }

    setRound(0)
    api?.scrollTo(0)
    dateApi?.scrollTo(0)
  }, [data, women, seasonId, api, dateApi, setGroup, setRound])

  const animationObject = data.find((item) => item.women === women)

  const dateArray = animationObject
    ? animationObject.games.find((item) => item.group === group)?.dates
    : []

  const justDatesArray = dateArray
    ? Array.from(dateArray, (item) => {
        const dateArray = item.date.split('-')
        const date = `${parseInt(dateArray[2])}/${parseInt(dateArray[1])}`
        return date
      })
    : []

  const dateArrayLength = dateArray ? dateArray.length : 0

  const seriesArray = animationObject ? animationObject.series : []

  const groupArray = animationObject
    ? animationObject.games.map((item) => {
        return { group: item.group, serieName: item.serieName }
      })
    : []

  const groupName = animationObject
    ? animationObject.games.find((item) => item.group === group)?.serieName
    : ''

  return {
    data,
    animationObject,
    dateArray,
    dateArrayLength,
    justDatesArray,
    groupName,
    groupArray,
    seriesArray,
    isLoading,
    isSuccess,
    error,
  }
}

export default useAnimationData
