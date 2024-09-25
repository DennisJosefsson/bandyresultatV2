import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/')

const Metadata = () => {
  const navigate = route.useNavigate()
  const women = route.useSearch({ select: (search) => search.women })
  const { seasonId } = route.useParams()
  const metadata = route.useLoaderData({ select: (search) => search.metadata })
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle>Metadata</CardTitle>
          <Button
            onClick={() => {
              navigate({
                to: '/dashboard/season/$seasonId/metadata',
                params: { seasonId: seasonId },
                search: { women: women },
              })
            }}
            size="sm"
          >
            Ändra metadata
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 text-sm">
          <div></div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <div>Finalstad:</div> <div>{metadata.hostCity}</div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>Finaldatum:</div> <div>{metadata.finalDate}</div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>SM-Guld:</div>
              <div> {metadata.winnerName}</div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>Kommentar:</div> <div>{metadata.comment}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Metadata
