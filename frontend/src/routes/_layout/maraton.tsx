import SimpleErrorComponent from '@/components/Components/Common/SimpleErrorComponent'
import MaratonTabBar from '@/components/Components/Maraton/MaratonTabBar'
import { Card, CardContent } from '@/components/ui/card'
import { CatchBoundary, createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/maraton')({
  component: Maraton,
})

function Maraton() {
  return (
    <div className="flex min-h-screen flex-col px-2 font-inter text-foreground">
      <Card className="mb-2">
        <CardContent className="p-2">
          <MaratonTabBar />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-2">
          <CatchBoundary
            getResetKey={() => 'reset'}
            onCatch={(error) => {
              console.error(error)
            }}
            errorComponent={({ error, reset }) => (
              <SimpleErrorComponent
                id="maratonbase"
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
