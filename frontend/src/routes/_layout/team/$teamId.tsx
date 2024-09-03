import Loading from '@/components/Components/Common/Loading'
import SimpleErrorComponent from '@/components/Components/Common/SimpleErrorComponent'
import Team from '@/components/Components/SingleTeam/Team'
import { getSingleTeam } from '@/lib/requests/teams'
import {
  CatchBoundary,
  createFileRoute,
  notFound,
} from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/team/$teamId')({
  loader: async ({ params }) => {
    const team = await getSingleTeam(params.teamId)

    if (
      typeof team === 'object' &&
      'errors' in team &&
      team.errors === 'Inget sådant lag finns.'
    )
      throw notFound()
    return team
  },
  component: SingleTeam,
  pendingComponent: () => <Loading page="singleTeam" />,
  notFoundComponent: NotFound,
})

function SingleTeam() {
  return (
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
        <Team />
      </CatchBoundary>
    </div>
  )
}

function NotFound() {
  return (
    <div className="mt-2 flex flex-row justify-center">
      Finns tyvärr inget sådant lag.
    </div>
  )
}
