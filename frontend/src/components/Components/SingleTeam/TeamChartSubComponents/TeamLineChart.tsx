import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getRouteApi } from '@tanstack/react-router'
import TeamLine from './TeamLine'

const route = getRouteApi('/_layout/team/$teamId')

const TeamLineChart = () => {
  const chartDataLength = route.useLoaderData({
    select: (data) => data.chartDataLength,
  })

  if (chartDataLength === 0) {
    return (
      <div className="flex flex-row justify-center mt-4">
        <h2 className="text-xs font-bold md:text-sm">
          Tyvärr saknas data för detta lag.
        </h2>
      </div>
    )
  }

  return (
    <>
      <Card>
        <CardHeader className="p-1 md:p-6">
          <CardTitle className="text-[10px] md:text-sm">Säsonger</CardTitle>
        </CardHeader>
        <CardContent className="p-1 md:p-6">
          <TeamLine />
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
