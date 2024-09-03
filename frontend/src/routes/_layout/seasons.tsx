import Loading from '@/components/Components/Common/Loading'
import SimpleErrorComponent from '@/components/Components/Common/SimpleErrorComponent'
import FilterComponent from '@/components/Components/Season/FilterComponent'
import SeasonsList from '@/components/Components/Season/SeasonsList'
import { Card, CardContent } from '@/components/ui/card'
import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'
import { getSeasons } from '@/lib/requests/seasons'
import { CatchBoundary, createFileRoute } from '@tanstack/react-router'
import { KeyboardEvent, useState } from 'react'

export const Route = createFileRoute('/_layout/seasons')({
  loader: () => getSeasons(),
  component: Seasons,
  pendingComponent: () => <Loading page="seasonList" />,
  errorComponent: () => <div>Oj, här gick något jättefel.</div>,
})

function Seasons() {
  const [seasonFilter, setSeasonFilter] = useState('')
  const seasons = Route.useLoaderData()

  useScrollTo()

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  return (
    <div className="mx-auto mb-2 min-h-screen w-full px-1 font-inter text-foreground">
      <Card>
        <CardContent className="mt-2">
          <CatchBoundary
            getResetKey={() => 'reset'}
            onCatch={(error) => {
              console.error(error)
            }}
            errorComponent={({ error, reset }) => (
              <SimpleErrorComponent
                id="Säsongslista"
                error={error}
                reset={reset}
              />
            )}
          >
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
          </CatchBoundary>
        </CardContent>
      </Card>
    </div>
  )
}
