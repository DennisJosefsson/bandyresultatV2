import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { singleTeam, teamChartType } from '@/lib/types/teams/singleTeam'

import { z } from 'zod'
import TeamLine from './TeamLine'

export type LineChartType = {
  year: string
  tick: string | undefined | null
  dataPoint: number | undefined | null
}

const tickParser = (item: z.infer<typeof teamChartType>): string => {
  if (item.gold) return 'SM-Guld'
  else if (item.final) return 'Final'
  else if (item.semi) return 'Semi'
  else if (item.quarter) return 'Kvart'
  else if (item.eight) return 'Åttondel'
  else if (item.negQualification) return 'Kval'
  else if (item.qualification) return 'Kval'
  else if (item.teamseasonId) return 'Grundserie'
  return ''
}

const dataPointParser = (item: z.infer<typeof teamChartType>): number => {
  if (item.gold) return 7
  else if (item.final) return 6
  else if (item.semi) return 5
  else if (item.quarter) return 4
  else if (item.eight) return 3
  else if (item.negQualification) return 1
  else if (item.qualification) return 1
  else if (item.teamseasonId) return 2
  return 0
}

const lineArray = (
  chartData: z.infer<typeof singleTeam>['chartData']
): LineChartType[] => {
  const array = chartData.map((item) => {
    return {
      year: item.year.slice(-4),
      tick: tickParser(item),
      dataPoint: dataPointParser(item),
    }
  })
  return array
}

const TeamLineChart = ({
  chartData,
}: {
  chartData: z.infer<typeof singleTeam>['chartData']
}) => {
  if (chartData.length === 0) {
    return (
      <div className="flex flex-row justify-center mt-4">
        <h2 className="text-xs font-bold md:text-sm">
          Tyvärr saknas data för detta lag.
        </h2>
      </div>
    )
  }
  const lineChartData = lineArray(chartData)

  const perChunk = 16

  const renderData = lineChartData
    .reverse()
    .reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk)

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []
      }

      resultArray[chunkIndex].unshift(item)

      return resultArray
    }, [] as LineChartType[][])
    .reverse()

  const renderLength = renderData.length

  return (
    <>
      <Card>
        <CardHeader className="p-1 md:p-6">
          <CardTitle className="text-[10px] md:text-sm">
            Säsonger i högsta serien
          </CardTitle>
        </CardHeader>
        <CardContent className="p-1 md:p-6">
          <TeamLine renderData={renderData} renderLength={renderLength} />
        </CardContent>
      </Card>
    </>
  )
}

export default TeamLineChart
