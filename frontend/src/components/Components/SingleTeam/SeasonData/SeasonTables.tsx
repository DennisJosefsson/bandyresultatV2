import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_layout/team/$teamId/$seasonId')

const SeasonTables = () => {
  const tables = route.useLoaderData({ select: (data) => data.tables })
  const staticTables = route.useLoaderData({
    select: (data) => data.staticTables,
  })
  return <div>SeasonTables</div>
}

export default SeasonTables
