import { SeasonObjectType } from '@/lib/types/season/seasons'
import {
  setDashboard,
  useDashboardStore,
} from '@/lib/zustand/dashboard/dashboardStore'
import { useNavigate } from '@tanstack/react-router'

export type FormContent =
  | 'teamseason'
  | 'series'
  | 'metadata'
  | 'bulkAddGame'
  | null

const SeasonsList = ({ seasons }: { seasons: SeasonObjectType[] }) => {
  const navigate = useNavigate({ from: '/dashboard/seasons' })
  const dashboardData = useDashboardStore((state) => state.dashboard)

  return (
    <>
      <div className="grid grid-cols-4 justify-between gap-x-8 gap-y-2 pt-2">
        {seasons
          .sort((a, b) => {
            if (a.year < b.year) {
              return 1
            }
            if (a.year > b.year) {
              return -1
            }
            return 0
          })
          .map((season) => {
            return (
              <div
                key={season.seasonId}
                className="flex flex-row items-center justify-between bg-background px-2 py-1 text-sm lg:text-base"
              >
                <div
                  className="cursor-pointer font-semibold"
                  onClick={() => {
                    setDashboard({
                      ...dashboardData,
                      year: season.year,
                      women: season.women,
                      teamSeasonData: undefined,
                      seriesData: undefined,
                    })
                    navigate({
                      to: '/dashboard/season/$seasonId',
                      params: { seasonId: season.seasonId },
                      search: { women: season.women },
                    })
                  }}
                >
                  {season.year} {season.women ? 'Dam' : 'Herr'}
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default SeasonsList
