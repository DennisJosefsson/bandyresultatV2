import { CompareResponseObjectType } from '@/lib/types/teams/compare'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CompareFormState } from '@/lib/types/teams/teams'
type SeasonProps = {
  seasons: CompareResponseObjectType['seasons']
  allSeasons: CompareResponseObjectType['allSeasons']
  searchObject: CompareFormState
}

const Seasons = ({ seasons, allSeasons, searchObject }: SeasonProps) => {
  const women = searchObject['women']
  return (
    <>
      <Card className="mt-2 w-full">
        <CardHeader>
          <CardTitle className="text-xs md:text-sm">Säsonger</CardTitle>
        </CardHeader>
        <CardContent className="compareFirstLast w-full text-[8px] sm:text-sm">
          <div className="mb-2">
            {allSeasons.map((team) => {
              return (
                <div key={team.team} className="card">
                  <div className="line2">
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
            <CardHeader>
              <CardTitle className="text-xs md:text-sm">
                Säsonger sedan 1931
              </CardTitle>
            </CardHeader>
            <CardContent className="compareFirstLast w-full text-[8px] sm:text-sm">
              <div className="mb-2">
                {seasons.map((team) => {
                  return (
                    <div key={team.team} className="card">
                      <div className="line2">
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
