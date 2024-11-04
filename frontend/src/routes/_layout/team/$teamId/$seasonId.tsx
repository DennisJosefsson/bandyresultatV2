import Loading from '@/components/Components/Common/Loading'
import SimpleErrorComponent from '@/components/Components/Common/SimpleErrorComponent'
import SingleTeamSeason from '@/components/Components/SingleTeam/SeasonData/SingleTeamSeason'
import { getSingleTeamSeason } from '@/lib/requests/teams'
import {
  CatchBoundary,
  createFileRoute,
  notFound,
} from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_layout/team/$teamId/$seasonId')({
  params: {
    parse: (params) => ({
      seasonId: z.number().int().parse(Number(params.seasonId)),
    }),
    stringify: ({ seasonId }) => ({ seasonId: `${seasonId}` }),
  },
  loader: async ({ params: { teamId, seasonId } }) => {
    const season = await getSingleTeamSeason({ teamId, seasonId })
    if (typeof season === 'object' && 'errors' in season) {
      throw notFound({ data: season.errors })
    }

    return season
  },
  component: Season,
  pendingComponent: () => <Loading page="singleTeamTable" />,
  notFoundComponent(props) {
    if (typeof props.data === 'object' && props.data && 'data' in props.data) {
      return (
        <div className="mt-2 flex flex-row justify-center">
          <p>{`${props.data.data}`}</p>
        </div>
      )
    }
    return (
      <div className="mt-2 flex flex-row justify-center">
        <p>Något gick fel.</p>
      </div>
    )
  },
})

function Season() {
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
        <div className="mt-2 flex min-h-screen flex-col font-inter text-foreground w-full">
          <SingleTeamSeason />
        </div>
      </CatchBoundary>
    </div>
  )
}
