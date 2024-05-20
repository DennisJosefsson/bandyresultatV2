import Loading from '@/components/Components/Common/Loading'
import SeasonHeader from '@/components/Components/Season/SeasonHeader'
import SeasonTabBar from '@/components/Components/Season/SeasonTabBar'
import { Card, CardContent } from '@/components/ui/card'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/season/$seasonId')({
  component: Season,
  notFoundComponent: NotFound,
  pendingComponent: Loading,
})

function Season() {
  return (
    <div className="mx-auto mt-2 flex min-h-screen flex-col px-2 font-inter text-foreground">
      <Card className="mb-2">
        <CardContent className="mt-2 max-w-full">
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
  return <div>Sidan hittades inte, säker på att du fått rätt länk?</div>
}
