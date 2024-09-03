import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
import SimpleErrorComponent from '@/components/Components/Common/SimpleErrorComponent'
import SeasonTablesButtonList from '@/components/Components/Season/SeasonTableComponents/SeasonTablesButtonList'

import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'
import {
  CatchBoundary,
  createFileRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/season/$seasonId/tables/')({
  beforeLoad: ({ search, params }) => {
    throw redirect({
      to: '/season/$seasonId/tables/$table',
      params: { table: 'all', seasonId: params.seasonId },
      search: { women: search.women },
    })
  },
  component: Tables,
})

function Tables() {
  const { seasonId } = Route.useParams()
  const { women } = Route.useSearch()
  useScrollTo()

  if (women && parseInt(seasonId) < 1973) {
    return <NoWomenSeason />
  }

  if (parseInt(seasonId) < 1930) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-foreground md:text-base">
        <p className="mx-10 text-center">
          Inga serietabeller för denna säsong.
        </p>
      </div>
    )
  }
  return (
    <div>
      <SeasonTablesButtonList />
      <CatchBoundary
        getResetKey={() => 'reset'}
        onCatch={(error) => {
          console.error(error)
        }}
        errorComponent={({ error, reset }) => (
          <SimpleErrorComponent
            id="Säsongstabell"
            error={error}
            reset={reset}
          />
        )}
      >
        <Outlet />
      </CatchBoundary>
    </div>
  )
}
