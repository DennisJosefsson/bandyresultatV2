import TeamsTabBar from '@/components/Components/Teams/TeamsTabBar'
import { Card, CardContent } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useCompare } from '@/lib/hooks/dataHooks/teams/useCompare'
import { CompareFormState } from '@/lib/types/teams/teams'
import { CatchBoundary, Outlet, createFileRoute } from '@tanstack/react-router'
import { SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

const searchParams = z.object({
  women: z.boolean(),
  teamArray: z.array(z.number()).optional(),
  categoryArray: z.array(z.string()).optional(),
  startSeason: z.string().optional(),
  endSeason: z.string().optional(),
})

export const Route = createFileRoute('/_layout/teams')({
  component: TeamsHeader,
  validateSearch: searchParams,
})

function TeamsHeader() {
  const { methods } = useCompare()

  const onSubmit: SubmitHandler<CompareFormState> = (data) => console.log(data)

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
            <Form {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} id="compare">
                <Outlet />
              </form>
            </Form>
          </CatchBoundary>
        </CardContent>
      </Card>
    </div>
  )
}
