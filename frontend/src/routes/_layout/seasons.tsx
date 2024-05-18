import Loading from '@/components/Components/Common/Loading'
import FilterComponent from '@/components/Components/Season/FilterComponent'
import SeasonsList from '@/components/Components/Season/SeasonsList'
import { Card, CardContent } from '@/components/ui/card'
import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'
import { allSeasons } from '@/lib/queries/season/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState, KeyboardEvent } from 'react'

export const Route = createFileRoute('/_layout/seasons')({
  loader: ({ context }) => context.queryClient.ensureQueryData(allSeasons),
  component: Seasons,
  pendingComponent: Loading,
})

function Seasons() {
  const [seasonFilter, setSeasonFilter] = useState('')
  const { data: seasons } = useSuspenseQuery(allSeasons)

  useScrollTo()

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  return (
    <div className="mx-auto mb-2 min-h-screen w-full px-1 font-inter text-foreground">
      <Card>
        <CardContent>
          <FilterComponent
            seasonFilter={seasonFilter}
            setSeasonFilter={setSeasonFilter}
            handleKeyDown={handleKeyDown}
          />

          <div className="self-center">
            <SeasonsList
              seasons={seasons.filter((season) =>
                season.year.includes(seasonFilter)
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
