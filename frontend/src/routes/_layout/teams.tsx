import TeamsTabBar from '@/components/Components/Teams/TeamsTabBar'
import { Card, CardContent } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useCompare } from '@/lib/hooks/dataHooks/teams/useCompare'
import { CompareFormState } from '@/lib/types/teams/teams'
import { CatchBoundary, Outlet, createFileRoute } from '@tanstack/react-router'
import { SubmitHandler } from 'react-hook-form'

export const Route = createFileRoute('/_layout/teams')({
  component: TeamsHeader,
})

function TeamsHeader() {
  const { methods } = useCompare()

  const onSubmit: SubmitHandler<CompareFormState> = (data) => console.log(data)

  const formValues = methods.watch()

  return (
    <div className="mx-auto mb-2 min-h-screen px-1 font-inter text-foreground">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} id="compare">
          <Card>
            <CardContent className="p-2 pt-2 md:p-6 md:pt-6">
              <TeamsTabBar formValues={formValues} />
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
        </form>
      </Form>
    </div>
  )
}
