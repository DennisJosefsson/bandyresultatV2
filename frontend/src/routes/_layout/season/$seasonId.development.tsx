import Loading from '@/components/Components/Common/Loading'
// import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
// import AnimationClicker from '@/components/Components/Season/SeasonDevelopmentComponents/AnimationClicker'
// import AnimationGamesList from '@/components/Components/Season/SeasonDevelopmentComponents/AnimationGamesList'
// import AnimationTable from '@/components/Components/Season/SeasonDevelopmentComponents/AnimationTable'
// import GroupSelector from '@/components/Components/Season/SeasonDevelopmentComponents/GroupSelector'
import { Button } from '@/components/ui/button'
// import { CarouselApi } from '@/components/ui/carousel'
// import useDevelopmentData from '@/lib/hooks/dataHooks/development/useDevelopmentData'
// import { getAnimation } from '@/lib/requests/games'
import { getDevelopmentSeries } from '@/lib/requests/series'
import {
  createFileRoute,
  Link,
  Navigate,
  notFound,
  Outlet,
} from '@tanstack/react-router'
// import { AxiosError } from 'axios'
// import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/_layout/season/$seasonId/development')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ params, deps }) => {
    const series = await getDevelopmentSeries({
      seasonId: params.seasonId,
      women: deps.women,
    })

    if (
      typeof series === 'object' &&
      'errors' in series &&
      series.errors === 'No sub series'
    ) {
      throw notFound()
    }

    return series
  },

  pendingComponent: Loading,
  component: Subs,
  notFoundComponent: NotFound,
})

// {
//   loaderDeps: ({ search: { women } }) => ({ women }),
//   component: Development,
//   pendingComponent: () => <Loading page="seasonDevelopment" />,
//   loader: ({ deps, params }) =>
//     getAnimation({ seasonId: params.seasonId, women: deps.women }),
//   errorComponent: ({ error, reset }) => (
//     <ErrorComponent error={error} reset={reset} />
//   ),
// }

function Subs() {
  const gameSeries = Route.useLoaderData({ select: (data) => data.gameSeries })

  // if (gameSeries.length === 0) {
  //   return (
  //     <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-[10px] font-bold text-foreground md:text-base">
  //       <p className="mx-10 text-center">
  //         Matcher för lägre divisioner saknas för denna säsong. Gå till{' '}
  //         <Link
  //           from={Route.fullPath}
  //           to="/season/$seasonId/develop"
  //           params={(prev) => ({ seasonId: prev.seasonId })}
  //           search={(prev) => ({ ...prev })}
  //           className="underline"
  //         >
  //           högsta divisionen
  //         </Link>
  //         .
  //       </p>
  //     </div>
  //   )
  // }

  if (gameSeries.length === 1) {
    return (
      <div className="mt-2">
        <Navigate
          from={Route.fullPath}
          to="/season/$seasonId/development/$group"
          params={(prev) => ({ ...prev, group: gameSeries[0].serieGroupCode })}
          search={(prev) => ({ ...prev })}
        />
        <Outlet />
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-row gap-1 justify-center mt-2">
        {gameSeries.map((serie) => {
          return (
            <Link
              from={Route.fullPath}
              to="$group"
              params={{ group: serie.serieGroupCode }}
              search={(prev) => ({ ...prev })}
              key={serie.serieId}
            >
              {({ isActive }) => {
                return (
                  <Button variant={isActive ? 'default' : 'outline'} size="sm">
                    {serie.serieName}
                  </Button>
                )
              }}
            </Link>
          )
        })}
      </div>
      <div className="mt-2">
        <Outlet />
      </div>
    </div>
  )
}

// function Development() {
//   const { seasonId } = Route.useParams()
//   const [group, setGroup] = useState<string | null>(null)
//   const [round, setRound] = useState<number>(0)
//   const [api, setApi] = useState<CarouselApi>()
//   const [dateApi, setDateApi] = useState<CarouselApi>()

//   const {
//     groupName,
//     groupArray,
//     seriesArray,
//     dateArray,
//     dateArrayLength,
//     data,
//     justDatesArray,
//   } = useDevelopmentData(group, setGroup, setRound, api, dateApi)
//   const { women } = Route.useSearch()

//   useEffect(() => {
//     if (!api || !dateApi) return
//     api.on('select', () => {
//       setRound(api.selectedScrollSnap())

//       dateApi.scrollTo(api.selectedScrollSnap(), true)
//     })
//   }, [api, dateApi])

//   if (women && seasonId < 1973) {
//     return <NoWomenSeason />
//   }

//   if (data && data.length === 0) {
//     return (
//       <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-foreground md:text-base">
//         <p className="mx-10 text-center">
//           Data över serieutvecklingen saknas för denna säsong.
//         </p>
//       </div>
//     )
//   }

//   if (data && data.length > 0) {
//     return (
//       <div className="w-full mx-auto flex flex-col pt-2 font-inter text-foreground">
//         {data.games.length > 1 && (
//           <GroupSelector
//             groupArray={groupArray}
//             setRound={setRound}
//             setGroup={setGroup}
//             groupName={groupName}
//             api={api}
//             dateApi={dateApi}
//             group={group}
//           />
//         )}

//         {groupName !== '' && data.games.length > 0 && (
//           <div>
//             <AnimationClicker
//               arrayLength={dateArrayLength}
//               groupName={groupName}
//               setApi={setApi}
//               api={api}
//               setDateApi={setDateApi}
//               dateApi={dateApi}
//               justDatesArray={justDatesArray}
//             />

//             {dateArray ? (
//               <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
//                 <AnimationGamesList dateArray={dateArray} round={round} />
//                 <AnimationTable
//                   dateArray={dateArray}
//                   round={round}
//                   seriesArray={seriesArray}
//                   group={group}
//                 />
//               </div>
//             ) : null}
//           </div>
//         )}
//       </div>
//     )
//   }
// }

// function ErrorComponent({
//   error,
//   reset,
// }: {
//   error: unknown
//   reset: () => void
// }) {
//   const pathname = useLocation({ select: (location) => location.pathname })
//   const errorLocation = useRef(pathname)
//   useEffect(() => {
//     if (location.pathname !== errorLocation.current) {
//       reset()
//     }
//   }, [pathname, reset])
//   if (error && error instanceof AxiosError && error.response?.status === 404) {
//     return <div>{error.response?.data.errors}</div>
//   }

//   return <div className="flex flex-row justify-center">Något gick fel.</div>
// }

function NotFound() {
  const women = Route.useSearch({ select: (s) => s.women })
  return (
    <div className="mt-2 flex flex-row justify-center">
      <p>
        Inga matcher från lägre divisioner finns inlagda för{' '}
        {women ? 'damer' : 'herrar'} denna säsong. Gå till{' '}
        <Link
          from={Route.fullPath}
          to="/season/$seasonId/games"
          params={(prev) => ({ seasonId: prev.seasonId })}
          search={(prev) => ({ ...prev })}
          className="underline"
        >
          högsta divisionen
        </Link>
        .
      </p>
    </div>
  )
}
