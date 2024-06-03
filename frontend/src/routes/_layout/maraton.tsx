import Loading from '@/components/Components/Common/Loading'
import MaratonComponentSwitch from '@/components/Components/Maraton/MaratonComponentSwitch'
import MaratonTabBar from '@/components/Components/Maraton/MaratonTabBar'
import { Card, CardContent } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const maratonTabs = z.object({
  tab: z.enum(['maraton', 'records', 'help']).catch('maraton'),
  table: z.enum(['home', 'away', 'all']).optional(),
  record: z
    .enum(['generalStats', 'points', 'scored', 'conceded', 'streaks'])
    .optional(),
  women: z.boolean(),
})

export const Route = createFileRoute('/_layout/maraton')({
  beforeLoad: ({ context, search }) => {
    if (context.genderContext.women !== search.women)
      context.genderContext.dispatch({ type: 'SET', payload: search.women })
  },
  component: Maraton,
  pendingComponent: Loading,
  validateSearch: maratonTabs,
})

function Maraton() {
  const { tab } = Route.useSearch()

  return (
    <div className="mx-auto mt-2 flex min-h-screen flex-col px-2 font-inter text-foreground">
      <Card className="mb-2 items-center">
        <CardContent className="p-2 pt-2 md:p-6 md:pt-6">
          <MaratonTabBar />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="mt-2">
          <MaratonComponentSwitch tab={tab} />
        </CardContent>
      </Card>
    </div>
  )
}
