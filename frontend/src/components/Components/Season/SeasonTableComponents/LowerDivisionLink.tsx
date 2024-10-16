import { getRouteApi, Link } from '@tanstack/react-router'

const route = getRouteApi('/_layout/season/$seasonId/tables/$table')

const LowerDivisionLink = () => {
  const hasLowerLevel = route.useLoaderData({
    select: (data) => data.hasLowerLevel,
  })
  return (
    <div className="mb-2">
      {hasLowerLevel ? (
        <Link
          from="/season/$seasonId/tables/$table"
          to="/season/$seasonId/tables/sub"
          params={(prev) => ({ seasonId: prev.seasonId })}
          search={(prev) => ({ ...prev })}
        >
          <span className="text-[10px] md:text-sm">Lägre divisioner</span>
        </Link>
      ) : null}
    </div>
  )
}

export default LowerDivisionLink
