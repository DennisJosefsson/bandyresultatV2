import Loading from '@/components/Components/Common/Loading'
import SeasonHeader from '@/components/Components/Season/SeasonHeader'
import SeasonTabBar from '@/components/Components/Season/SeasonTabBar'
import { Card, CardContent } from '@/components/ui/card'

import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'
import { z } from 'zod'

const seasonIdParser = z.string().length(4)

export const Route = createFileRoute('/_layout/season/$seasonId')({
  component: Season,
  notFoundComponent: NotFound,
  pendingComponent: Loading,
  loader: ({ params }) => {
    const parseSeasonId = seasonIdParser.safeParse(params.seasonId)
    if (!parseSeasonId.success) throw notFound()
  },
})

function Season() {
  return (
    <div className="mx-auto flex min-h-screen flex-col px-2 font-inter text-foreground">
      <Card className="mb-2">
        <CardContent className="max-w-full">
          <SeasonHeader />
          <SeasonTabBar />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="mt-2">
          <Outlet />
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
