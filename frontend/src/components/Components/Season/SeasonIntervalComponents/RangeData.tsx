import { Slider } from '@/components/ui/slider'
import { getRouteApi } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import IntervalTable from './IntervalTable'
import { getTable } from './utils/getTable'

const route = getRouteApi('/_layout/season/$seasonId/interval/$group')

const RangeData = () => {
  const dates = route.useLoaderData({ select: (data) => data.games.dates })
  const serie = route.useLoaderData({ select: (data) => data.serie })
  const dateArrayLength = route.useLoaderData({ select: (data) => data.length })
  const [range, setRange] = useState([0, dateArrayLength - 1])

  useEffect(() => {
    setRange([0, dateArrayLength - 1])
  }, [dateArrayLength])

  const table = useMemo(() => {
    return getTable(range, dates)
  }, [range, dates])

  if (!table) return null

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-row justify-between text-[8px] xs:text-[10px] sm:text-xs lg:text-base">
        <span className="w-24">{table.startDate}</span>
        <span className="font-semibold">{serie.serieName}</span>
        <span className="w-24 text-right">{table.endDate}</span>
      </div>
      <Slider
        value={range}
        onValueChange={setRange}
        minStepsBetweenThumbs={1}
        min={0}
        max={dateArrayLength - 1}
      />
      <IntervalTable table={table.table} serie={serie} />
    </div>
  )
}

export default RangeData
