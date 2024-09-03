import Loading from '@/components/Components/Common/Loading'
import SimpleErrorComponent from '@/components/Components/Common/SimpleErrorComponent'
import MaratonTableHeader from '@/components/Components/Maraton/MaratonTableSubComponents/MaratonTableHeader'
import { CatchBoundary, createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/maraton/table')({
  component: MaratonTables,
  pendingComponent: Loading,
})

function MaratonTables() {
  return (
    <div>
      <MaratonTableHeader />
      <div>
        <CatchBoundary
          getResetKey={() => 'reset'}
          onCatch={(error) => {
            console.error(error)
          }}
          errorComponent={({ error, reset }) => (
            <SimpleErrorComponent id="maraton" error={error} reset={reset} />
          )}
        >
          <Outlet />
        </CatchBoundary>
      </div>
    </div>
  )
}
