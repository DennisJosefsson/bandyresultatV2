import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'
import DashboardTabBar from '@/components/Components/Dashboard/DashboardTabBar'

export const Route = createFileRoute('/_layout/dashboard')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/unauthorized' })
    }
  },
  component: DashboardHeader,
})

function DashboardHeader() {
  return (
    <div className="mx-auto mb-2 min-h-screen px-1 font-inter text-foreground">
      <Card>
        <CardContent className="p-2 pt-2 md:p-6 md:pt-6">
          <DashboardTabBar />
        </CardContent>
      </Card>
      <Card className="mt-2">
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  )
}
