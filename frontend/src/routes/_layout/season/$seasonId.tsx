import Loading from '@/components/Components/Common/Loading'
import SimpleErrorComponent from '@/components/Components/Common/SimpleErrorComponent'
import SeasonHeader from '@/components/Components/Season/SeasonHeader'
import SeasonTabBar from '@/components/Components/Season/SeasonTabBar'
import { Card, CardContent } from '@/components/ui/card'

import {
  CatchBoundary,
  createFileRoute,
  Navigate,
  Outlet,
  useChildMatches,
} from '@tanstack/react-router'
import { z } from 'zod'

const getMaxYear = () => {
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  if (month > 6) return year + 1
  return year
}

const seasonIdParser = z.object({
  seasonId: z.number().int().min(1907),
})

export const Route = createFileRoute('/_layout/season/$seasonId')({
  params: {
    parse: (params) => ({
      seasonId: z
        .number()
        .int()
        .min(1907)
        .max(getMaxYear())
        .catch(getMaxYear())
        .parse(Number(params.seasonId)),
    }),
    stringify: ({ seasonId }) => ({ seasonId: `${seasonId}` }),
  },
  component: Season,
  notFoundComponent: NotFound,
  pendingComponent: () => <Loading page="singleSeason" />,
})

function Season() {
  const matches = useChildMatches()
  if (matches.length === 0) {
    return (
      <Navigate
        from="/season/$seasonId"
        to="/season/$seasonId/tables/$table"
        params={(prev) => ({ ...prev, table: 'all' })}
        search={(prev) => ({ ...prev })}
      />
    )
  }
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
