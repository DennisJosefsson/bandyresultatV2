import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TeamChartType } from '@/lib/types/teams/teams'
import { useSearch } from '@tanstack/react-router'
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { useMediaQuery } from 'usehooks-ts'

type PositionType = {
  year: string
  dataPoint: number | undefined | null
  position: number | undefined | null
  points: number | undefined | null
}

const TeamBarChart = ({ chartData }: { chartData: TeamChartType[] }) => {
  const matches1240 = useMediaQuery('(min-width: 1240px)')
  const matches768 = useMediaQuery('(min-width: 768px)')
  const { women } = useSearch({ from: '/_layout' })
  const baseLinePosition = women ? 10 : 17
  const baseLineSeasonId = women ? 161 : 101
  const positionChart: PositionType[] = chartData
    .filter((year) => year.seasonId > baseLineSeasonId)
    .map((year) => {
      return {
        year: year.year.slice(-4),
        dataPoint: year.position ? baseLinePosition - year.position : 0,
        position: year.position,
        points: year.points,
      }
    })

  return (
    <>
      <Card>
        <CardHeader className="p-1 md:p-6">
          <CardTitle className="text-[10px] md:text-sm">
            Slutplacering Elitserien
          </CardTitle>
        </CardHeader>
        <CardContent className="p-1 md:p-6">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={positionChart}>
              <XAxis
                dataKey="year"
                stroke="#888888"
                fontSize={matches1240 ? 12 : 8}
                angle={matches768 ? 0 : -30}
                tickLine={false}
                axisLine={false}
              />
              <YAxis hide={true} domain={[0, women ? 9 : 16]} />
              <Bar
                dataKey="dataPoint"
                fill="currentColor"
                className="fill-primary text-[8px] md:text-sm"
              >
                <LabelList
                  dataKey="position"
                  position="center"
                  fill="currentColor"
                  className="text-primary-foreground"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  )
}

export default TeamBarChart
