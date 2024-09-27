import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { dashboardData } from '@/lib/types/dashboard/dashboard'
import { z } from 'zod'

type DashboardDataItemProps = {
  data: z.infer<typeof dashboardData>[]
  title: string
}

const DashboardDataItem = ({ data, title }: DashboardDataItemProps) => {
  const menCount = data.find((item) => item.women === false)?.count ?? 0
  const womenCount = data.find((item) => item.women === true)?.count ?? 0
  const total = data.find((item) => item.women === null)?.count ?? 0
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1">
            <span className="flex flex-row w-full justify-between">
              <span>Herrar:</span> <span>{menCount}</span>
            </span>
            <span className="flex flex-row w-full justify-between">
              <span>Damer:</span> <span>{womenCount}</span>
            </span>
            <span className="flex flex-row w-full justify-between">
              <span>Totalt:</span> <span>{total}</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardDataItem
