import { getRouteApi } from '@tanstack/react-router'
import Metadata from './Metadata'
import Series from './Series'
import Teams from './Teams'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/')

const Season = () => {
  const season = route.useLoaderData({ select: (data) => data.season })
  return (
    <div className="mt-4">
      <div className="mb-2">
        <h2 className="text-lg font-semibold">{`${season.year} - ${season.women ? 'Damer' : 'Herrar'}`}</h2>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Teams />
        <Series />
        <Metadata />
      </div>
    </div>
  )
}

export default Season
