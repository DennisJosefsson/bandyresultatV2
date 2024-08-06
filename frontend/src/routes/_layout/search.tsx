import SearchTabBar from '@/components/Components/Search/SearchTabBar'
import { Card, CardContent } from '@/components/ui/card'
import { searchParamsObject } from '@/lib/types/games/search'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/search')({
  component: SearchHeader,
  validateSearch: searchParamsObject,
})

function SearchHeader() {
  return (
    <div className="mx-auto mb-2 min-h-screen px-1 font-inter text-foreground">
      <Card>
        <CardContent className="p-2 pt-2 md:p-6 md:pt-6">
          <SearchTabBar />
        </CardContent>
      </Card>
      <Card className="mt-2">
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  )
}
