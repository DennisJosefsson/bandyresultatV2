import Loading from '@/components/Components/Common/Loading'
import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
import AnimationClicker from '@/components/Components/Season/SeasonDevelopmentComponents/AnimationClicker'
import AnimationGamesList from '@/components/Components/Season/SeasonDevelopmentComponents/AnimationGamesList'
import AnimationTable from '@/components/Components/Season/SeasonDevelopmentComponents/AnimationTable'
import GroupSelector from '@/components/Components/Season/SeasonDevelopmentComponents/GroupSelector'
import { CarouselApi } from '@/components/ui/carousel'
import useDevelopmentData from '@/lib/hooks/dataHooks/development/useDevelopmentData'
import { developmentQueries } from '@/lib/queries/development/queries'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_layout/season/$seasonId/development')({
  component: Development,
  pendingComponent: Loading,
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(
      developmentQueries['data'](params.seasonId)
    )
  },
})

function Development() {
  const { seasonId } = Route.useParams()
  const [group, setGroup] = useState<string | null>(null)
  const [round, setRound] = useState<number>(0)
  const [api, setApi] = useState<CarouselApi>()
  const [dateApi, setDateApi] = useState<CarouselApi>()

  const {
    groupName,
    groupArray,
    seriesArray,
    dateArray,
    dateArrayLength,
    animationObject,
    justDatesArray,
  } = useDevelopmentData(seasonId, group, setGroup, setRound, api, dateApi)
  const { women } = Route.useSearch()

  useEffect(() => {
    if (!api || !dateApi) return
    api.on('select', () => {
      setRound(api.selectedScrollSnap())

      dateApi.scrollTo(api.selectedScrollSnap(), true)
    })
  }, [api, dateApi])

  if (women && parseInt(seasonId) < 1973) {
    return <NoWomenSeason />
  }

  if (animationObject && animationObject.length === 0) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-foreground md:text-base">
        <p className="mx-10 text-center">
          Data över serieutvecklingen saknas för denna säsong.
        </p>
      </div>
    )
  }

  if (animationObject && animationObject.length > 0) {
    return (
      <div className="mx-auto flex flex-col pt-2 font-inter text-foreground">
        {animationObject.games.length > 1 && (
          <GroupSelector
            groupArray={groupArray}
            setRound={setRound}
            setGroup={setGroup}
            groupName={groupName}
            api={api}
            dateApi={dateApi}
            group={group}
          />
        )}

        {groupName !== '' && animationObject.games.length > 0 && (
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

            {dateArray ? (
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
                <AnimationGamesList dateArray={dateArray} round={round} />
                <AnimationTable
                  dateArray={dateArray}
                  round={round}
                  seriesArray={seriesArray}
                  group={group}
                />
              </div>
            ) : null}
          </div>
        )}
      </div>
    )
  }
}
