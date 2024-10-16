import { CarouselApi } from '@/components/ui/carousel'
import useDevelopmentData from '@/lib/hooks/dataHooks/development/useDevelopmentData'
import { useEffect, useState } from 'react'
import AnimationClicker from './AnimationClicker'
import AnimationGamesList from './AnimationGamesList'
import AnimationTable from './AnimationTable'

const DevelopmentData = () => {
  const [round, setRound] = useState<number>(0)
  const [api, setApi] = useState<CarouselApi>()
  const [dateApi, setDateApi] = useState<CarouselApi>()
  const { groupName, serie, dateArray, dateArrayLength, justDatesArray } =
    useDevelopmentData(setRound, api, dateApi)

  useEffect(() => {
    if (!api || !dateApi) return
    api.on('select', () => {
      setRound(api.selectedScrollSnap())
      dateApi.scrollTo(api.selectedScrollSnap(), true)
    })
  }, [api, dateApi])

  return (
    <div className="w-full mx-auto flex flex-col pt-2 font-inter text-foreground">
      <div>
        <AnimationClicker
          arrayLength={dateArrayLength}
          groupName={groupName}
          setApi={setApi}
          api={api}
          setDateApi={setDateApi}
          dateApi={dateApi}
          justDatesArray={justDatesArray}
        />

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
          <AnimationGamesList dateArray={dateArray} round={round} />
          <AnimationTable dateArray={dateArray} round={round} serie={serie} />
        </div>
      </div>
    </div>
  )
}

export default DevelopmentData
