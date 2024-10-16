import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { singleTeam } from '@/lib/types/teams/singleTeam'

import { z } from 'zod'
import TeamLine from './TeamLine'

const TeamLineChart = ({
  chartDataLength,
  renderData,
}: {
  chartDataLength: number
  renderData: z.infer<typeof singleTeam>['renderData']
}) => {
  if (chartDataLength === 0) {
    return (
      <div className="flex flex-row justify-center mt-4">
        <h2 className="text-xs font-bold md:text-sm">
          Tyvärr saknas data för detta lag.
        </h2>
      </div>
    )
  }

  const renderLength = renderData.length

  return (
    <>
      <Card>
        <CardHeader className="p-1 md:p-6">
          <CardTitle className="text-[10px] md:text-sm">Säsonger</CardTitle>
        </CardHeader>
        <CardContent className="p-1 md:p-6">
          <TeamLine renderData={renderData} renderLength={renderLength} />
          <CardFooter className="my-2 bg-background p-1 text-[10px] md:text-xs font-bold">
            För närvarande pågår arbete med att lägga in data för lägre serier,
            det gör att ovanstående diagram kan vara missvisande för de år som
            ännu saknas.
          </CardFooter>
        </CardContent>
      </Card>
    </>
  )
}

export default TeamLineChart
