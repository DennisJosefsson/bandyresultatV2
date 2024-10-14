import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { singleTeam } from '@/lib/types/teams/singleTeam'
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
import { z } from 'zod'

const TeamBarChart = ({
  barChartData,
}: {
  barChartData: z.infer<typeof singleTeam>['barChartData']
}) => {
  const matches1240 = useMediaQuery('(min-width: 1240px)')
  const matches768 = useMediaQuery('(min-width: 768px)')
  const { women } = useSearch({ from: '/_layout' })

  if (barChartData.length === 0) return null

  return (
    <>
      <Card>
        <CardHeader className="p-1 md:p-6">
          <CardTitle className="text-[10px] md:text-sm">
            Slutplacering Elitserien
          </CardTitle>
        </CardHeader>
        <CardContent className="p-1 md:p-6">
          <ResponsiveContainer
            width={
              barChartData.length > 5 ? '100%' : barChartData.length * 40 + 100
            }
            height={350}
          >
            <BarChart data={barChartData}>
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
