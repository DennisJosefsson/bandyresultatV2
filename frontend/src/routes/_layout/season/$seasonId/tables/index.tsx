import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
import SeasonTablesButtonList from '@/components/Components/Season/SeasonTableComponents/SeasonTablesButtonList'

import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/season/$seasonId/tables/')({
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
      <Outlet />
    </div>
  )
}
