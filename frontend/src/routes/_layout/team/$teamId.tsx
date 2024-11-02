import Loading from '@/components/Components/Common/Loading'
import SimpleErrorComponent from '@/components/Components/Common/SimpleErrorComponent'
import TeamHeader from '@/components/Components/SingleTeam/TeamHeader'
import { getSingleTeam } from '@/lib/requests/teams'
import {
  CatchBoundary,
  createFileRoute,
  Link,
  notFound,
  Outlet,
} from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_layout/team/$teamId')({
  params: {
    parse: (params) => ({
      teamId: z.number().int().parse(Number(params.teamId)),
    }),
    stringify: ({ teamId }) => ({ teamId: `${teamId}` }),
  },
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
          <SimpleErrorComponent id="singleteam" error={error} reset={reset} />
        )}
      >
        <div className="mt-2 flex min-h-screen flex-col font-inter text-foreground">
          <TeamHeader />
          <Outlet />
        </div>
      </CatchBoundary>
    </div>
  )
}

function NotFound() {
  return (
    <div className="mt-2 flex flex-row justify-center">
      <p>
        Finns tyvärr inget sådant lag, men det finns en{' '}
        <Link to="/teams" search={{ women: false }} className="underline">
          lista
        </Link>{' '}
        och man kan också söka via{' '}
        <Link to="/teams/map" search={{ women: false }} className="underline">
          karta
        </Link>
        .
      </p>
    </div>
  )
}
