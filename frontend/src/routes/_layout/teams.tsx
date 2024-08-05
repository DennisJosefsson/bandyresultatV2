import TeamsTabBar from '@/components/Components/Teams/TeamsTabBar'
import { Card, CardContent } from '@/components/ui/card'
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
})

function TeamsHeader() {
  return (
    <div className="mx-auto mb-2 min-h-screen px-1 font-inter text-foreground">
      <Card>
        <CardContent className="p-2 pt-2 md:p-6 md:pt-6">
          <TeamsTabBar />
        </CardContent>
      </Card>
      <Card className="mt-2">
        <CardContent>
          <CatchBoundary
            getResetKey={() => 'reset'}
            onCatch={(error) => {
              console.error(error)
            }}
          >
            <Outlet />
          </CatchBoundary>
        </CardContent>
      </Card>
    </div>
  )
}
