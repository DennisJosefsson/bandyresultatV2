import { compareResponseObject } from '@/lib/types/teams/compare'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { compareFormState } from '@/lib/types/teams/teams'
import { z } from 'zod'
type SeasonProps = {
  seasons: z.infer<typeof compareResponseObject>['seasons']
  allSeasons: z.infer<typeof compareResponseObject>['allSeasons']
  searchObject: z.infer<typeof compareFormState>
}

const Seasons = ({ seasons, allSeasons, searchObject }: SeasonProps) => {
  const women = searchObject['women']
  return (
    <>
      <Card className="mt-2 w-full">
        <CardHeader className="p-2">
          <CardTitle className="text-[10px] md:text-sm">Säsonger</CardTitle>
        </CardHeader>
        <CardContent className="  w-full text-[8px] sm:text-sm p-1 pt-0">
          <div className="mb-2">
            {allSeasons.map((team) => {
              return (
                <div
                  key={team.team}
                  className="my-2 flex w-full flex-col rounded bg-muted-foreground/20 px-3 py-1"
                >
                  <div className="flex flex-row justify-between">
                    <div>{team.casual_name}</div>
                    <div className="text-right">{team.seasons}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
      {!women && (
        <>
          <Card className="mt-2 w-full">
            <CardHeader className="p-2">
              <CardTitle className="text-[10px] md:text-sm">
                Säsonger sedan 1931
              </CardTitle>
            </CardHeader>
            <CardContent className="  w-full text-[8px] sm:text-sm  p-1 pt-0">
              <div className="mb-2">
                {seasons.map((team) => {
                  return (
                    <div
                      key={team.team}
                      className="my-2 flex w-full flex-col rounded bg-muted-foreground/20 px-3 py-1"
                    >
                      <div className="flex flex-row justify-between">
                        <div>{team.casual_name}</div>
                        <div className="text-right">{team.seasons}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  )
}

export default Seasons
