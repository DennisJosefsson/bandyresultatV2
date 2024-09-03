import { CarouselApi } from '@/components/ui/carousel'
import { useLoaderData } from '@tanstack/react-router'
import { Dispatch, SetStateAction, useEffect } from 'react'

const useAnimationData = (
  group: string | null,
  setGroup: Dispatch<SetStateAction<string | null>>,
  setRound: Dispatch<SetStateAction<number>>,
  api: CarouselApi | undefined,
  dateApi: CarouselApi | undefined
) => {
  const data = useLoaderData({ from: '/_layout/season/$seasonId/development' })

  useEffect(() => {
    const groupArray = data ? data.games.map((item) => item.group) : []
    if (groupArray.length === 1) {
      setGroup(groupArray[0])
    }

    setRound(0)
    api?.scrollTo(0)
    dateApi?.scrollTo(0)
  }, [data, api, dateApi, setGroup, setRound])

  const dateArray = data
    ? data.games.find((item) => item.group === group)?.dates
    : []

  const justDatesArray = dateArray
    ? Array.from(dateArray, (item) => {
        const dateArray = item.date.split('-')
        const date = `${parseInt(dateArray[2])}/${parseInt(dateArray[1])}`
        return date
      })
    : []

  const dateArrayLength = dateArray ? dateArray.length : 0

  const seriesArray = data ? data.series : []

  const groupArray = data
    ? data.games.map((item) => {
        return { group: item.group, serieName: item.serieName }
      })
    : []

  const groupName = data
    ? data.games.find((item) => item.group === group)?.serieName
    : ''

  return {
    data,
    dateArray,
    dateArrayLength,
    justDatesArray,
    groupName,
    groupArray,
    seriesArray,
  }
}

export default useAnimationData
