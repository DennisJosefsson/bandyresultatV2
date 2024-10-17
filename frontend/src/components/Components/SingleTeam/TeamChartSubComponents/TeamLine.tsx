import { Button } from '@/components/ui/button'
import { singleTeam } from '@/lib/types/teams/singleTeam'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { getRouteApi } from '@tanstack/react-router'
import { useState } from 'react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { useMediaQuery } from 'usehooks-ts'
import { z } from 'zod'

const route = getRouteApi('/_layout/team/$teamId')
type TeamLineProps = {
  renderData: z.infer<typeof singleTeam>['renderData']
  renderLength: number
  chunk?: number
}

const yAxisFormatter = (value: number) => {
  switch (value) {
    case 2:
      return 'Lägre division'
    case 3:
      return 'Kval'
    case 4:
      return 'Grundserie'
    case 5:
      return 'Åttondel'
    case 6:
      return 'Kvart'
    case 7:
      return 'Semi'
    case 8:
      return 'Final'
    case 9:
      return 'SM-guld'
    default:
      return ''
  }
}

function PreviousChartLable({
  renderData,
  renderLength,
  chunk,
}: TeamLineProps) {
  if (chunk === undefined) return ''
  if (renderData[chunk === 0 ? renderLength - 1 : chunk - 1].length === 1)
    return `${renderData[chunk === 0 ? renderLength - 1 : chunk - 1][0]?.year}`
  const lable = `${renderData[chunk === 0 ? renderLength - 1 : chunk - 1][0]?.year} - ${renderData[chunk === 0 ? renderLength - 1 : chunk - 1][renderData[chunk === 0 ? renderLength - 1 : chunk - 1].length - 1]?.year}`
  return lable
}

function NextChartLable({ renderData, renderLength, chunk }: TeamLineProps) {
  if (chunk === undefined) return ''
  if (renderData[chunk === renderLength - 1 ? 0 : chunk + 1].length === 1)
    return `${renderData[chunk === renderLength - 1 ? 0 : chunk + 1][0]?.year}`
  const lable = `${renderData[chunk === renderLength - 1 ? 0 : chunk + 1][0]?.year} - ${renderData[chunk === renderLength - 1 ? 0 : chunk + 1][renderData[chunk === renderLength - 1 ? 0 : chunk + 1].length - 1]?.year}`
  return lable
}

const TeamLine = () => {
  const renderData = route.useLoaderData({ select: (data) => data.renderData })
  const renderLength = renderData.length
  const [chunk, setChunk] = useState<number>(renderLength - 1)

  const matches768 = useMediaQuery('(min-width: 768px)')
  return (
    <div className="flex flex-col gap-y-1 md:gap-y-2">
      {renderLength > 1 ? (
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-1">
            <Button
              asChild
              onClick={() =>
                setChunk((previous) =>
                  previous === 0 ? renderLength - 1 : previous - 1
                )
              }
              variant="ghost"
            >
              <div className="flex flex-row items-center gap-1 cursor-pointer">
                <ArrowLeftIcon className="h-4 w-4" />
                <span className="sr-only">Föregående</span>

                <div className="text-[8px] md:text-[12px]">
                  {PreviousChartLable({ renderData, renderLength, chunk })}
                </div>
              </div>
            </Button>
          </div>

          <div className="flex flex-row items-center gap-1">
            <Button
              variant="ghost"
              onClick={() =>
                setChunk((previous) =>
                  previous === renderLength - 1 ? 0 : previous + 1
                )
              }
            >
              <div className="flex flex-row items-center gap-1 cursor-pointer">
                <div className="text-[8px] md:text-[12px]">
                  {NextChartLable({ renderData, renderLength, chunk })}
                </div>
                <ArrowRightIcon className="h-4 w-4" />
                <span className="sr-only">Nästa</span>
              </div>
            </Button>
          </div>
        </div>
      ) : null}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={renderData[chunk]}
          margin={{ left: matches768 ? 30 : 0, right: matches768 ? 15 : 0 }}
        >
          <XAxis
            dataKey="year"
            fontSize={matches768 ? 12 : 8}
            angle={matches768 ? 0 : -30}
            axisLine={false}
            tickLine={false}
            stroke="currentColor"
            className="text-primary"
          />
          <YAxis
            dataKey="dataPoint"
            domain={[0, 10]}
            interval={0}
            fontSize={matches768 ? 12 : 8}
            tickFormatter={yAxisFormatter}
            tickCount={10}
            axisLine={false}
            tickLine={false}
            minTickGap={0}
            tickMargin={5}
            stroke="currentColor"
            className="text-primary"
          />
          <Line
            type="monotone"
            dataKey="dataPoint"
            stroke="currentColor"
            className="text-primary"
            strokeWidth={5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TeamLine
