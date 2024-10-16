import { Button } from '@/components/ui/button'
import { getRouteApi } from '@tanstack/react-router'
import AddTeamToSeries from './AddTeamToSeries'
import SeriesTables from './SeriesTables'
import SeriesTeamList from './SeriesTeamList'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/info/$serieId')

const SeriesInfo = () => {
  const navigate = route.useNavigate()
  const data = route.useLoaderData({ select: (s) => s.seriesInfo })
  return (
    <div className="flex flex-col p-2 gap-2">
      <div className="flex flex-row justify-between">
        <h4 className="font-semibold text-lg">{data.serieName}</h4>
        <Button
          onClick={() =>
            navigate({
              to: '/dashboard/season/$seasonId',
              params: (prev) => ({ seasonId: prev.seasonId }),
              search: (prev) => ({ ...prev }),
            })
          }
        >
          Tillbaka
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-10">
        <div>
          <SeriesTeamList teams={data.teams} />
        </div>
        <div>
          <AddTeamToSeries />
        </div>
        <div>
          <SeriesTables tables={data.tables} />
        </div>
      </div>
    </div>
  )
}

export default SeriesInfo
