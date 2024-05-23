import { CompareResponseObjectType } from '@/lib/types/teams/compare'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
type GoldsProps = {
  golds: CompareResponseObjectType['golds']
}

const Golds = ({ golds }: GoldsProps) => {
  return (
    <Card className="mt-2 w-full">
      <CardHeader>
        <CardTitle className="text-xs md:text-sm">SM-Guld</CardTitle>
      </CardHeader>
      <CardContent className="compareFirstLast w-full text-[8px] sm:text-sm">
        <div className="mb-2">
          {golds.map((team) => {
            return (
              <div key={team.team} className="card">
                <div className="line2">
                  <div>{team.casual_name}</div>
                  <div className="text-right">{team.guld}</div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default Golds
