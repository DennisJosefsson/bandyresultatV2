import {
  compareFormState,
  compareResponseObject,
} from '@/lib/types/teams/compare'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { z } from 'zod'
type SeasonProps = {
  firstDivisionSeasonsSince1931: z.infer<
    typeof compareResponseObject
  >['firstDivisionSeasonsSince1931']
  firstDivisionSeasons: z.infer<
    typeof compareResponseObject
  >['firstDivisionSeasons']
  allDbSeasons: z.infer<typeof compareResponseObject>['allDbSeasons']
  searchObject: z.infer<typeof compareFormState>
}

const Seasons = ({
  firstDivisionSeasonsSince1931,
  firstDivisionSeasons,
  allDbSeasons,
  searchObject,
}: SeasonProps) => {
  const women = searchObject['women']
  return (
    <>
      <Card className="mt-2 w-full">
        <CardHeader className="p-2">
          <CardTitle className="text-[10px] md:text-sm">
            Säsonger i databasen
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full text-[10px] sm:text-sm p-1 pt-0">
          <div className="mb-2">
            {allDbSeasons.map((team) => {
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
      <Card className="mt-2 w-full">
        <CardHeader className="p-2">
          <CardTitle className="text-[10px] md:text-sm">
            Säsonger i högsta serien
          </CardTitle>
        </CardHeader>
        <CardContent className="  w-full text-[10px] sm:text-sm p-1 pt-0">
          <div className="mb-2">
            {firstDivisionSeasons.map((team) => {
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
                Säsonger i högsta serien sedan 1931
              </CardTitle>
            </CardHeader>
            <CardContent className="  w-full text-[10px] sm:text-sm  p-1 pt-0">
              <div className="mb-2">
                {firstDivisionSeasonsSince1931.map((team) => {
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
