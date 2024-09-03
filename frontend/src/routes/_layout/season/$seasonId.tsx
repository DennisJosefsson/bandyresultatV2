import Loading from '@/components/Components/Common/Loading'
import SimpleErrorComponent from '@/components/Components/Common/SimpleErrorComponent'
import SeasonHeader from '@/components/Components/Season/SeasonHeader'
import SeasonTabBar from '@/components/Components/Season/SeasonTabBar'
import { Card, CardContent } from '@/components/ui/card'
import { getSingleSeason } from '@/lib/requests/seasons'

import {
  CatchBoundary,
  Outlet,
  createFileRoute,
  notFound,
} from '@tanstack/react-router'
import { z } from 'zod'

const seasonIdParser = z
  .string()
  .length(4)
  .refine((val) => parseInt(val) > 1906)

export const Route = createFileRoute('/_layout/season/$seasonId')({
  component: Season,
  notFoundComponent: NotFound,
  pendingComponent: () => <Loading page="singleSeason" />,
  loader: async ({ params }) => {
    const season = await getSingleSeason(params.seasonId)
    if (
      typeof season === 'object' &&
      'errors' in season &&
      season.errors === 'No such season'
    ) {
      throw notFound()
    }
    return season
  },
})

function Season() {
  return (
    <div className="flex min-h-screen flex-col px-2 font-inter text-foreground">
      <Card className="mb-2">
        <CardContent className="max-w-full">
          <SeasonHeader />
          <SeasonTabBar />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="mt-2 p-2">
          <CatchBoundary
            getResetKey={() => 'reset'}
            onCatch={(error) => {
              console.error(error)
            }}
            errorComponent={({ error, reset }) => (
              <SimpleErrorComponent
                id="Enskild säsong"
                error={error}
                reset={reset}
              />
            )}
          >
            <Outlet />
          </CatchBoundary>
        </CardContent>
      </Card>
    </div>
  )
}

function NotFound() {
  const seasonId = Route.useParams().seasonId
  const parseSeasonId = seasonIdParser.safeParse(seasonId)
  if (!parseSeasonId.success) {
    return (
      <div className="flex flex-row justify-center">
        Felaktigt säsongsId, kolla om länken är korrekt.
      </div>
    )
  }

  return (
    <div className="flex flex-row justify-center">Den länken finns inte.</div>
  )
}
