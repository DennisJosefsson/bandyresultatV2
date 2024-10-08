import Loading from '@/components/Components/Common/Loading'
import SimpleErrorComponent from '@/components/Components/Common/SimpleErrorComponent'
import SeasonsList from '@/components/Components/Season/SeasonsList'
import SeasonsPagination from '@/components/Components/Seasons/Pagination'
import { Card, CardContent } from '@/components/ui/card'

import { getPaginatedSeasons } from '@/lib/requests/seasons'
import { CatchBoundary, createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const validateSearch = z.object({ page: z.number().catch(1) })

export const Route = createFileRoute('/_layout/seasons')({
  validateSearch: validateSearch,
  loaderDeps: ({ search: { page } }) => ({ page }),
  component: Seasons,
  pendingComponent: () => <Loading page="seasonList" />,
  errorComponent: () => <div>Oj, här gick något jättefel.</div>,
  loader: ({ deps }) => getPaginatedSeasons({ page: deps.page }),
})

function Seasons() {
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
            <SeasonsPagination />
            <div className="self-center">
              <SeasonsList />
            </div>
            <div className="sm:hidden">
              <SeasonsPagination />
            </div>
          </CatchBoundary>
        </CardContent>
      </Card>
    </div>
  )
}
