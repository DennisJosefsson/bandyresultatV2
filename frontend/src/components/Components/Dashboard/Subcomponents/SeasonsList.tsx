import { season } from '@/lib/types/season/seasons'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'

export type FormContent =
  | 'teamseason'
  | 'series'
  | 'metadata'
  | 'bulkAddGame'
  | null

const SeasonsList = ({ seasons }: { seasons: z.infer<typeof season>[] }) => {
  const navigate = useNavigate({ from: '/dashboard/seasons' })

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
