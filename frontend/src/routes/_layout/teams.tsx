import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'
import TeamsTabBar from '@/components/Components/Teams/TeamsTabBar'
import { useCompare } from '@/lib/hooks/dataHooks/teams/useCompare'
import { Form } from '@/components/ui/form'

export const Route = createFileRoute('/_layout/teams')({
  component: TeamsHeader,
})

function TeamsHeader() {
  const { methods } = useCompare()
  return (
    <div className="mx-auto mb-2 min-h-screen px-1 font-inter text-foreground">
      <Card>
        <CardContent className="p-2 pt-2 md:p-6 md:pt-6">
          <TeamsTabBar />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Form {...methods}>
            <form>
              <Outlet />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
