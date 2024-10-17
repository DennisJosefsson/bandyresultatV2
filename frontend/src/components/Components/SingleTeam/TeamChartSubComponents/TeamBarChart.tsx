import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getRouteApi } from '@tanstack/react-router'
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { useMediaQuery } from 'usehooks-ts'

const route = getRouteApi('/_layout/team/$teamId')

const TeamBarChart = () => {
  const barChartData = route.useLoaderData({
    select: (data) => data.barChartData,
  })
  const matches1240 = useMediaQuery('(min-width: 1240px)')
  const matches768 = useMediaQuery('(min-width: 768px)')
  const women = route.useSearch({ select: (s) => s.women })

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
