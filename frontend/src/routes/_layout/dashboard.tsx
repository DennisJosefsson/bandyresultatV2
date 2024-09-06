import DashboardTabBar from '@/components/Components/Dashboard/DashboardTabBar'
import { Card, CardContent } from '@/components/ui/card'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard')({
  beforeLoad: ({ context, search }) => {
    if (!context.user) {
      throw redirect({ to: '/unauthorized', search: { women: search.women } })
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
