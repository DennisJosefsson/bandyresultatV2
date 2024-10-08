import SimpleErrorComponent from '@/components/Components/Common/SimpleErrorComponent'
import TeamsTabBar from '@/components/Components/Teams/TeamsTabBar'
import { Card, CardContent } from '@/components/ui/card'
import { getTeams } from '@/lib/requests/teams'
import { CatchBoundary, Outlet, createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const searchParams = z.object({
  women: z.boolean(),
  teamArray: z.array(z.number()).optional(),
  categoryArray: z.array(z.string()).optional(),
  startSeason: z.number().optional(),
  endSeason: z.number().optional(),
})

export const Route = createFileRoute('/_layout/teams')({
  component: TeamsHeader,
  validateSearch: searchParams,
  loader: () => getTeams(),
})

function TeamsHeader() {
  return (
    <div className="mb-2 min-h-screen px-1 font-inter text-foreground">
      <Card>
        <CardContent className="p-2 md:p-4">
          <TeamsTabBar />
        </CardContent>
      </Card>
      <Card className="mt-2">
        <CardContent className="p-2">
          <CatchBoundary
            getResetKey={() => 'reset'}
            onCatch={(error) => {
              console.error(error)
            }}
            errorComponent={({ error, reset }) => (
              <SimpleErrorComponent id="teams" error={error} reset={reset} />
            )}
          >
            <Outlet />
          </CatchBoundary>
        </CardContent>
      </Card>
    </div>
  )
}
